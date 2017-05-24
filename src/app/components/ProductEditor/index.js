import React from 'react';
import AdminPrEditor from './AdminPrEditor';
import CustomerPrEditor from './CustomerPrEditor';
import { ADMIN } from '../../Constants';

export default class ProductEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contentFor: this.props.content,
      error: '',
      success: ''
    }
  }

  componentWillMount() {
    if(this.props.params) {
      this.setState({typeId: this.props.params.id})
    }
  };

  render(){
    if(this.state.contentFor == ADMIN){
      return <AdminPrEditor />
    } else if (this.state.contentFor == null || this.state.contentFor == undefined){
      return <CustomerPrEditor id_type={this.state.typeId} />
    }
  }
}