import React from 'react';
import Item from '../Item';
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
      DOMPages: null
    }
  }

  componentWillMount(){
    this.getInfoForPage();
  };

  changePage = (page) => {
    this.setState({page: page});
    this.getInfoForPage();
  };

  calcRange = () => {
    return (this.state.page - 1) * this.state.countRows;
  };

  getInfoForPage = () => {
    getPam(null, this.props.id_type, this.calcRange(), this.state.countRows, true).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({pams: data})
      }
    });
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
        body.push(<Item key={thisElem.id_prod} mainImg={mainImg} images={images} info={info} />);
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
    return <div className="row">
      {this.state.pams && this.pamsDom()}
      <Pages
        countRows={this.state.countRows}
        type={this.props.id_type}
        onChange={this.changePage}
      />
    </div>
  }
}