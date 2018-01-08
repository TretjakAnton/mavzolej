import React from 'react';
import Item from '../Item';
import SaleForm from '../../containers/SaleForm';
import {
  getPam
} from '../../api/newPam';
import { addBodyClass } from '../../helpers';
import Pages from '../Pages';

export default class AdminPrEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      countRows: 10,
      pams: null,
      error: null,
      DOMPages: null,
      id_type: this.props.id_type,
      form: {
        status: false,
        image: '',
        info: '',
      }
    }
  }

  componentWillMount(){
    this.getInfoForPage();
  };

  componentWillReceiveProps = (newProps) => {
    this.setState({id_type: newProps.id_type});
    this.getInfoForPage(newProps.id_type);
  };

  changePage = (page) => {
    this.setState({page: page});
    this.getInfoForPage(null, page);
  };

  calcRange = (page) => {
    return (page - 1) * this.state.countRows;
  };

  getInfoForPage = (id, page) => {
    const id_type = id || this.state.id_type;
    const newPage = page || this.state.page;

    getPam(null, id_type, this.calcRange(newPage), this.state.countRows, true).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({pams: data})
      }
    });
  };

  openForm = (data) => {
    this.setState({
      form: {
        status: true,
        image: data.image,
        info: data.info,
      }
    });
    addBodyClass(true);
  };

  closeForm = () => {
    this.setState({
      form: {
        status: false,
        image: '',
        info: '',
      }
    });
    addBodyClass(false);
  };

  render(){
    const {
      form,
      pams,
      countRows,
      id_type
    } = this.state;

    return <div className="row">
      {pams && pams.map((el) => {
        return (
          <Item
            key={el._id}
            info={el}
            onSelect={this.openForm}
          />
        );
      })}
      {form.status && <SaleForm info={form.info} image={form.image} onClose={this.closeForm}/> }
      <div className="page-selector col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Pages
          countRows={countRows}
          type={id_type}
          onChange={this.changePage}
        />
      </div>
    </div>
  }
}