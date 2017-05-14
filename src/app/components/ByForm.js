import React from 'react';
import {
  Radio,
  Col
}  from 'react-bootstrap';
import { getForm } from '../api/Form';
import Selection from './Selection';

class ByForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
      error: ''
    }
  };

  componentWillMount() {
    getForm().then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({formData: data})
      }
    })
  };

  renderForm = () => {
    var data = this.state.formData;
    let elementsToRender = [];
    let itemSelect = [];

    elementsToRender.push(<span key={data[0].id_field + Math.random()}>{data[0].name}</span>);

    for (var key in data) {
      if (data[key].type == 'radio') {
        elementsToRender.push(<Radio key={data[key].id_field} name={data[key].name}
                                     value={data[key].price}> {data[key].description}, {data[key].price}</Radio>);
      }
      if (data[key].type == 'select') {
        itemSelect.push(data[key]);

        if (data[parseInt(key) + 1] && data[key].name !== data[parseInt(key) + 1].name || !data[parseInt(key) + 1] && itemSelect.length > 0){
          elementsToRender.push(<Selection key={data[0].id_field + Math.random()} items={itemSelect}/>);
          itemSelect = [];
        }

      }
      if (data[parseInt(key) + 1] && data[key].name !== data[parseInt(key) + 1].name) {
        elementsToRender.push(<span key={data[key].id_field + Math.random()}>{ data[parseInt(key) + 1].name}</span>);
      }
    }
    return ( <Col sm={6}>{elementsToRender}</Col> );
  };

  render() {
    return <div className="flex-container">
      { this.state.formData && this.renderForm() }
    </div>
  }
}

export default ByForm;
