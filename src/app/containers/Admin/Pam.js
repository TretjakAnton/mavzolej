import React from 'react';
import Dropzone from 'react-dropzone';
import {
  Button,
  FormControl,
  ControlLabel,
  FormGroup,
  Col,
}  from 'react-bootstrap';
import { addUpdatePam } from '../../api/newPam';
import ProductEditor from '../../components/ProductEditor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTypes } from '../../actions/Actions';
import { getAllTypes } from '../../api/Types';
import { ADMIN } from '../../Constants';

class Pam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: '',
      types: null,
      id_fake: '',
      price: '',
      description: '',
      type_name: '',
      uploadedFiles: []
    };
    this.initData();
  };

  initData() {
    getAllTypes().then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.props.setTypes(data);
        this.setState({
          types: data,
          type_name: data.length > 0 ? data[0].type_name : ''
        });
      }
    })
  };

  inputsConrol = (event) => {
    if(event.target.name == "id_fake"){
      this.setState({id_fake: event.target.value})
    }
    if(event.target.name == "price"){
      this.setState({price: event.target.value})
    }
    if(event.target.name == "description"){
      this.setState({description: event.target.value})
    }
    if(event.target.name == "type_name"){
      this.setState({type_name: event.target.value})
    }
  };

  onSendAll = () => {
    const {id_fake, price, uploadedFiles, description} = this.state;
    const selectType = this.state.types.filter((type) => {
      if(type.type_name == this.state.type_name)
        return type
    });
    addUpdatePam(id_fake, selectType[0], description, price, uploadedFiles).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({
          success: data.success,
          id_fake: '',
          description: '',
          price: '',
          uploadedFiles: []
        });
      }
    });
  };

  generateDOM = (name) => {
    let domElements = [];
    if (name === 'types' && this.state.types !== null) {
      this.state.types.map((val, key) => {
        domElements.push(<option key={key} value={val.type_name}>{val.type_name}</option>);
      })
    }
    if (name === 'preview' && this.state.pam !== null) {
      this.state.uploadedFiles.map((val, key) => {
        domElements.push(<img key={key} src={val.preview} style={{height: '150px'}}/>)
      })
    }
    return domElements;
  };

  onImageDrop(files) {
    this.setState({
      uploadedFiles: files
    });
  }

  render() {
    return <div className="admin-controle-monuments">
      {this.state.types &&
        <div>
          <Dropzone
            multiple={true}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
          {this.state.uploadedFiles &&
            <div>{this.generateDOM('preview')}</div>
          }
          <FormGroup>
            <Col sm={6}>
              <FormControl type="number" placeholder="номер памятника" name="id_fake" value={this.state.id_fake} onChange={this.inputsConrol} />
              <ControlLabel>тип памятника</ControlLabel>
              <FormControl componentClass="select" name="type_name" value={this.state.type_name} onChange={this.inputsConrol}>
                {this.generateDOM('types')}
              </FormControl>
              <textarea style={{width: '100%', height: '100px'}} type="textarea" placeholder="описание" name="description" value={this.state.description} onChange={this.inputsConrol} />
              <FormControl type="number" placeholder="цена" name="price" value={this.state.price} onChange={this.inputsConrol} />
              <Button onClick={this.onSendAll}>
                 Сохранть
              </Button>
            </Col>
          </FormGroup>
          <div className="show-monuments">
            {/* <AdminPrEditor types={this.state.types} /> */}
            <ProductEditor content={ADMIN} types={this.state.types} />
          </div>
        </div>
      }
    </div>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTypes: bindActionCreators(setTypes, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Pam)