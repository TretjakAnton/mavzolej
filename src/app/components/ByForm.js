import React from 'react';
import {
  Radio,
  Col
}  from 'react-bootstrap';
import { getForm } from '../api/Form';

class ByForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      sum: null,
      itemsList: null,
      formData: null,
      error: ''
    }
  };

  componentWillMount() {
    getForm().then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        let mas = [];
        class formElement {
          name = '';
          type = '';
          data = [];
          currElem = null;

          setCurrent = (item) => {
            this.currElem = this.data.find((element) => element == item);
          };

          getCurrent = () => {
            return this.currElem;
          };
        }

        let currentObj = new formElement;

        for (let i=0; i<data.length; i++){
          let curr = data[i];
          let next = data[i+1] || false;

          currentObj.data.push({
            description: curr.description,
            price: curr.price,
          });

          if (next){
            if(curr.name !== next.name) {
              currentObj.name = curr.name;
              currentObj.type = curr.type;
              currentObj.setCurrent(currentObj.data[0]);
              mas.push(currentObj);
              currentObj = new formElement;
            }
          } else {
            currentObj.name = curr.name;
            currentObj.type = curr.type;
            currentObj.setCurrent(currentObj.data[0]);
            mas.push(currentObj);
          }
        }

        this.setState({formData: mas});
        this.changeSum();
      }
    })
  };


  changeSum = () => {
    let data = this.state.formData;
    let newList = [];
    let newSum = null;
    data.map((element) => {
      const currentInblock = element.getCurrent();
      newSum += currentInblock.price;
      newList.push({description: currentInblock.description, name: element.name})
    });

    this.setState({
      itemsList: newList,
      sum: newSum,
    });

    this.props.selectionHendler(newList, newSum);
  };

  createRadio = (element) => {
    let domRadio = [];
    domRadio.push(<span>{element.name}</span>);
    element.data.map((item, key) => {
      domRadio.push(
        <Radio
          key={key}
          name={element.name}
          value={item}
          onChange={() => {element.setCurrent(item); this.changeSum()}}
          checked={item == element.currElem}
        >
          {item.description}, {item.price}
        </Radio>
      )
    });

    return domRadio;
  };

  createSelect = (element) => {
    const selection = (items) => <FormControl componentClass="select">{items}</FormControl>;
    let options = [];
    element.data.map((item, key) => {
      options.push(
        <option
          key={key}
          value={item}
          onChange={() => {element.setCurrent(item); this.changeSum()}}
        >
          {item.description}, {item.price}
        </option>
      );
    });
    let domSelect = [];
    domSelect.push(<span>{element.name}</span>);
    domSelect.push(selection(options));
    return domSelect;
  };

  renderForm = () => {
    let data = this.state.formData;
    let elementsToRender = [];

    data.map((elem) => {
      if (elem.type == 'radio') {
        elementsToRender.push(this.createRadio(elem));
      }
      if (elem.type == 'select') {
        elementsToRender.push(this.createSelect(elem));
      }
    });

    return ( <Col sm={6}>{elementsToRender}</Col> );
  };

  render() {
    return <div className="flex-container">
      { this.state.formData && this.renderForm() }
    </div>
  }
}

export default ByForm;
