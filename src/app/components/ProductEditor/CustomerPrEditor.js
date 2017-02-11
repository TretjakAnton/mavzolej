import React from 'react';
import { getPam } from '../../api/Pam';

export default class CustomerPrEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      page: 1,
      countRows: 10,
      pams: null,
      error: null
    }
  }
  componentWillMount(){
    this.getInfoForPage();
  };
  calcRange = () => {
    return (this.state.page - 1) * this.state.countRows;
  };
  getInfoForPage = () => {
    getPam(null, this.state.id_type, this.calcRange, this.state.countRows).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({pams: data})
      }
    });
  };
  render(){

  }
}
