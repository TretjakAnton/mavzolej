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
    const info = (id, price) => ({id: id, price: price});
    let body = [];
    const arrLength = this.state.pams.length;
    for(var i=0; i < arrLength; i++){
      let thisElem = this.state.pams[i];
      let nextElem = this.state.pams[i+1];
      let prevElem = this.state.pams[i-1];
      let imageAddress = `../../../media/${thisElem.folder}${thisElem.image}`;
      if(!prevElem || thisElem.id_pam !== prevElem.id_pam ){
        mainImg=imageAddress;
        if(i == arrLength -1 || thisElem.id_pam !== nextElem.id_pam){
            body.push(<Item key={thisElem.id_prod} mainImg={mainImg} images={images} info={info(thisElem.id_pam, thisElem.price)} onSelect={this.openForm} />);
            images = [];
            mainImg = null;
        }
      } else if(!nextElem || thisElem.id_pam !== nextElem.id_pam) {
        images.push(imageAddress);
        body.push(<Item key={thisElem.id_prod} mainImg={mainImg} images={images} info={info(thisElem.id_pam, thisElem.price)} onSelect={this.openForm} />);
        images = [];
        mainImg = null;
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
      <div className="page-selector col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Pages
          countRows={this.state.countRows}
          type={this.state.id_type}
          onChange={this.changePage}
        />
      </div>
    </div>
  }
}