import React from 'react';
import Dropzone from 'react-dropzone';
import { addPam } from '../../api/newPam';
import AdminPrEditor from '../../components/ProductEditor/AdminPrEditor';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTypes } from '../../actions/Actions';
import { getAllTypes } from '../../api/Types';

class Pam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: '',
      types: null,
      id_fake: '',
      price: '',
      id_type: '',
      uploadedFiles: []
    };
  };

  componentWillMount() {
    getAllTypes().then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.props.setTypes(data);
        this.setState({
          types: data,
          id_type: data[0].id_type
        })
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
    if(event.target.name == "id_type"){
      this.setState({id_type: event.target.value})
    }
  };

  onSendAll = () => {
    var selectType = this.state.types.filter((type) => {
      if(type.id_type == this.state.id_type)
        return type
    });
    addPam(this.state.id_fake, selectType, this.state.price, this.state.uploadedFiles).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({
          success: data.success,
          id_fake: '',
          price: '',
          uploadedFiles: []
        })
      }
    });
  };

  generateDOM = (name) => {
    let domElements = [];
    if (name === 'types' && this.state.types !== null) {
      this.state.types.map((val, key) => {
        domElements.push(<option key={key} value={val.id_type}>{val.name}</option>);
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
    return <div>
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
          <input type="text" name="id_fake" value={this.state.id_fake} onChange={this.inputsConrol}/>
          <select name="id_type" value={this.state.id_type} onChange={this.inputsConrol}>
            {this.generateDOM('types')}
          </select>
          <input type="text" name="price" value={this.state.price} onChange={this.inputsConrol}/>
          <button onClick={this.onSendAll}>Send</button>
          <div>
            <AdminPrEditor types={this.state.types} />
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