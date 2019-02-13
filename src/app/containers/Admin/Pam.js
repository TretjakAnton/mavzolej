import React from 'react';
import Dropzone from 'react-dropzone';
import {
  Button,
  FormControl,
  ControlLabel
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
      uploadedFiles: []
    };
    this.id_fake = React.createRef();
    this.price = React.createRef();
    this.description = React.createRef();
    this.type_name = React.createRef();

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

  onSendAll = () => {
    const id_fake = this.id_fake.current.value;
    const price = this.price.current.value;
    const description = this.description.current.value;
    const type_name = this.type_name.current.value;
    
    const selectType = this.state.types.filter((type) => {
      if(type.type_name == type_name)
        return type
    });
    
    addUpdatePam(id_fake, selectType[0], description, price, this.state.uploadedFiles).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({
          success: data.success,
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
        domElements.push(<img key={key} src={val.preview} style={{height: '160px'}}/>)
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
        <div className="admin-add-container">

          <div className="admin-add-images">
            <Dropzone
              multiple={true}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
              <p>Что бы загрузить файл/файлы, перетащиите их в эту область</p>
            </Dropzone>
            {this.state.uploadedFiles &&
              <div className="admin-image-prev">
                {this.generateDOM('preview')}
              </div>
            }
          </div>
          
          <div className="admin-form-control">
            <FormControl type="number" placeholder="номер памятника" name="id_fake" inputRef={this.id_fake} />
            <ControlLabel>тип памятника</ControlLabel>
            <FormControl componentClass="select" name="type_name" inputRef={this.type_name}>
              {this.generateDOM('types')}
            </FormControl>
            <textarea style={{width: '100%', height: '100px'}} type="textarea" placeholder="описание" name="description" ref={this.description} />
            <FormControl type="number" placeholder="цена" name="price" inputRef={this.price} />
            <Button onClick={this.onSendAll}>
                Сохранть
            </Button>
          </div>

          <div className="show-monuments">
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