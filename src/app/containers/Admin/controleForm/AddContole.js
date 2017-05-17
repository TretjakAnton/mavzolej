import React from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  Form,
  Radio,
  Col,
}  from 'react-bootstrap';

class AddControl extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      currentType: '',
      description: '',
      nameItem: '',
      price: '',
      error: '',
      controlObject: [
        {
          type: '',
          description: 'отсутствует',
          price: '',
          name: ''
        }
      ]
    };
  };

  handleParams = (element) => {
    if (element.target.name == "description"){
      this.setState({ description: element.target.value })
    }
    if (element.target.name == "nameItem"){
      let newCOName = this.state.controlObject;
      newCOName[0].name = element.target.value;
      this.setState({
        nameItem: element.target.value,
        controlObject: newCOName
      })
    }
    if (element.target.name == "price"){
      this.setState({ price: element.target.value })
    }
  };

  addField = () => {
    this.setState({ add: true });
  };

  addType(type) {
    this.setState({ add: false });
    let newCOType = this.state.controlObject;
    newCOType[0].type = type;
    this.setState({
      currentType: type,
      controlObject: newCOType
    });
  };

  generateControl = () => {
    if (this.state.currentType == 'select') {
      return (
        <FormControl componentClass="select">
          {this.state.controlObject.map((elem) => {
            return <option key={elem.price + Math.random()}>{`${elem.description}, ${elem.price}`}</option>
          })}
        </FormControl>
      );
    }

    if (this.state.currentType == 'radio') {
      return (
        <FormGroup>
          {this.state.controlObject.map((elem) => {
            return <Radio key={elem.price + Math.random()}> {`${elem.description}, ${elem.price}`} </Radio>
          })}
        </FormGroup>
      );
    }

    return null;
  };

  addToForm = () => {
    let newCO = this.state.controlObject;
    newCO.push({
      type: this.state.currentType,
      name: this.state.nameItem,
      description: this.state.description,
      price: this.state.price,
    });
    this.setState({
      controlObject: newCO,
      description: '',
      price: ''
    });
    console.log(this.state.controlObject)
  };

  send = () => {
    this.props.onSend(this.state.controlObject);
    this.cancel();
  };

  cancel = () => {
    this.setState({
      add: false,
      currentType: '',
      description: '',
      nameItem: '',
      price: '',
      error: '',
      controlObject: [
        {
          type: '',
          description: 'отсутствует',
          price: '',
          name: ''
        }
      ]
    });
  };

  render() {
    return <div className="flex-container">
      <Button onClick={this.addField}>add</Button>
      { this.state.add &&
      <FormGroup>
        <Col sm={6}>
          <Form inline>
            <FormControl componentClass="select">
              <option>список</option>
            </FormControl>
            <Button name="addSelect" onClick={() => this.addType("select")}>
              добавить
            </Button>
          </Form>
          <Form inline>
            <Radio>один из списка</Radio>
            <Button name="addRadio" onClick={() => this.addType("radio")}>
              добавить
            </Button>
          </Form>
        </Col>
      </FormGroup>
      }
      {this.state.currentType !== '' &&
      <FormGroup>
        <Col sm={6}>
          <FormControl type="text" name="nameItem" onChange={this.handleParams} placeholder="название пункта"/>
          <div>{this.generateControl()}</div>
          <hr/>
          <FormControl name="description" onChange={this.handleParams} placeholder="описание"/>
          <FormControl name="price" onChange={this.handleParams} placeholder="цена"/>
          <Button name="addSelect" onClick={this.addToForm}>
            Добавить
          </Button>
          <Button name="addSelect" onClick={this.send}>
            Сохранить
          </Button>
          <Button name="addSelect" onClick={this.cancel}>
             Отмена
          </Button>
        </Col>
      </FormGroup>
      }
    </div>
  }
}

export default AddControl;