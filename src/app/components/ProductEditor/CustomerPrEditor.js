import React from 'react';
import Item from '../Item';
import SaleForm from '../../containers/SaleForm';
import {
  getPam
} from '../../api/newPam';
import { addBodyClass } from '../../helpers';
import Pages from '../Pages';

export default class CustomerPrEditor extends React.Component{
  constructor(props){
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    const pageHref = parseInt(urlParams.get('page'));

    this.state = {
      countRows: 10,
      page: pageHref || 1,
      pams: null,
      error: null,
      id_type: this.props.id_type,
      form: {
        status: false,
        image: '',
        info: '',
      }
    }
  }

  componentWillMount() {
    this.getInfoForPage(this.state.id_type, this.state.page);
  };

  changePage = (page) => {
    this.setState({page: page});
    this.getInfoForPage(this.state.id_type, page);
  };

  calcRange = (page) => {
    return (page - 1) * this.state.countRows;
  };

  getInfoForPage = (id, page) => {
    getPam(null, id, this.calcRange(page), this.state.countRows, true).then((data) => {
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
      id_type,
      page
    } = this.state;

    return <div className="row product-container">
      {pams && pams.map((el) => {
        return (
          <Item
            key={el._id}
            info={el}
            onSelect={this.openForm}
          />
        );
      })}
      {form.status && <SaleForm type={id_type} info={form.info} image={form.image} onClose={this.closeForm}/> }
      <div className="page-selector col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Pages
          countRows={countRows}
          type={id_type}
          onChange={this.changePage}
          currentPage={page}
        />
      </div>
    </div>
  }
}