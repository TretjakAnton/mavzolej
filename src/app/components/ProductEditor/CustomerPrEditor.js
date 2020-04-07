import React from 'react';
import Item from '../Item';
import SaleForm from '../../containers/SaleForm';
import { addBodyClass } from '../../helpers';
import Pages from '../Pages';

class CustomerPrEditor extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      countRows: 10,
      error: null,
      form: {
        status: false,
        image: '',
        info: '',
      }
    }
    this.props.getPamInfo(null, this.props.id_type, this.props.page, this.state.countRows, true);
  }

  componentDidUpdate(prevProps) {
    if (this.props.id_type !== prevProps.id_type) {
      this.props.getPamInfo(null, this.props.id_type, this.props.page, this.state.countRows, true);
    }
  }

  changePage = (page) => {
    this.props.getPamInfo(null, this.props.id_type, page, this.state.countRows, true);
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
      countRows            
    } = this.state;
    const {pams, id_type, page} = this.props;

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

export default CustomerPrEditor;