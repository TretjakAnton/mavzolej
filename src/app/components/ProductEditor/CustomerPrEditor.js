import React from 'react';
import Item from '../Item';
import SaleForm from '../../containers/SaleForm';
import {
  getPam
} from '../../api/newPam';
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
    })
  };

  closeForm = () => {
    this.setState({
      form: {
        status: false,
        image: '',
        info: '',
      }
    })
  };

  pamsDom = () => {
    let images = [];
    let mainImg = null;
    let info = null;
    let body = [];
    for(var i=0; i<this.state.pams.length; i++){
      let thisElem = this.state.pams[i];
      let nextElem = this.state.pams[i+1];
      let prevElem = this.state.pams[i-1];
      let imageAddress = `../../../media/${thisElem.folder}${thisElem.image}`;

      if(!prevElem || thisElem.id_pam !== prevElem.id_pam ){
        mainImg=imageAddress
      } else if(!nextElem || thisElem.id_pam !== nextElem.id_pam) {
        images.push(imageAddress);
        info = {
          id: thisElem.id_pam,
          price: thisElem.price
        };
        body.push(<Item key={thisElem.id_prod} mainImg={mainImg} images={images} info={info} onSelect={this.openForm} />);
        images = [];
        mainImg = null;
        info = null;
      } else {
        images.push(imageAddress);
      }
    }

    return body;
  };

  render(){
    const form = this.state.form;
    return <div className="row">
      {this.state.pams && this.pamsDom()}
      {form.status && <SaleForm info={form.info} image={form.image} onClose={this.closeForm}/> }
      <Pages
        countRows={this.state.countRows}
        type={this.state.id_type}
        onChange={this.changePage}
      />
    </div>
  }
}