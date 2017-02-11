import React from 'react';
import Dropzone from 'react-dropzone';
import {
  getPam,
  getAllTypes,
  getSizes,
  getImages,
  addImages
} from '../../api/serverRequests';

class Pam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      success: '',
      types: null,
      sizes: null,
      images: null,
      pam: null,
      uploadedFiles: []
    };
  };

  componentWillMount() {
    getAllTypes().then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({types: data})
      }
    });
    getSizes().then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({sizes: data})
      }
    });
    getImages().then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({images: data})
      }
    });
    getPam().then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({pam: data})
      }
    });
  };

  onSendAll = () => {
    addImages(this.state.uploadedFiles).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({success: data.success})
      }
    });
  };

  generateDOM = (name) => {
    let domElements = [];
    if (name === 'types' && this.state.types !== null) {
      this.state.types.map((val, key) => {
        domElements.push(<option key={key} value={val.id_type}>{val.name_type}</option>);
      })
    }
    if (name === 'sizes' && this.state.sizes !== null) {
      this.state.sizes.map((val, key) => {
        domElements.push(<option key={key} value={val.id_size}>{val.size_name}</option>);
      })
    }
    if (name === 'pam' && this.state.pam !== null) {

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
    const checked = this.state.types !== null &&
      this.state.sizes !== null &&
      this.state.images !== null &&
      this.state.pam !== null;
    if (checked) {
      return <div className="flex-container">
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
          <input type="text" name="id_pam"/>
          <select name="id_type">
            {this.generateDOM('types')}
          </select>
          <input type="text" name="opis"/>
          <input type="text" name="price"/>
          <select name="id_size">
            {this.generateDOM('sizes')}
          </select>
          <button onClick={this.onSendAll}>Send</button>
        </div>
        <div>
          {this.generateDOM('pam')}
        </div>
      </div>
    }
    return null;
  }
}


export default Pam;