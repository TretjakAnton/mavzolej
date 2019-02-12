import React from 'react';
import Dropzone from 'react-dropzone';

export default class ImageControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
      previewFolder: this.props.previewFolder,
      uploadedFiles: [],
    }
  }

  setDeletingImages = (image) => {
    let newImages = this.state.images.filter(el => el !== image);

    this.setState({
      images: newImages,
    });
    this.props.deleteImages(image);
  }

  deleteUpdated = (image) => {
    const newImages = this.state.uploadedFiles.filter(el => el !== image);    

    this.setState({
      uploadedFiles: newImages
    });
    this.props.addNewImages(newImages);
  }

  generateImages = (name) => {
    const { uploadedFiles } = this.state;
    let domElements = [];

    if( uploadedFiles && uploadedFiles.length <= 0 ) return;

    uploadedFiles.map((val, key) => {
      domElements.push(
        <div 
          className="admin-image-container"
          key={key}
        >
          <div
            className="glyphicon glyphicon-remove remove-image"
            onClick={() => this.deleteUpdated(val)}>
          </div>
          <img src={val.preview} style={{ height: '150px' }} />
        </div>
      )
    })
    return domElements;
  };

  onImageDrop(files) {
    const { uploadedFiles } = this.state;
    let newFiles = files;

    if( uploadedFiles && uploadedFiles.length > 0 ) {
      newFiles = uploadedFiles;
      files.map((el) => {
        newFiles.push(el);
      });
    }

    this.setState({
      uploadedFiles: newFiles
    });

    this.props.addNewImages(newFiles);
  }

  render() {
    const {
      images,
      previewFolder,
    } = this.state;
    const { editing } = this.props;
    const imgStyle = {
      height: "110px"
    };
    return (
      <div className="admin-image-control col-xs-11">
        {images && images.map((el, key) => {
          const path = previewFolder + '/' + el;
          return (
            <div
              className="admin-image-container"
              key={key}
            >
              {editing &&
                <div
                  className="glyphicon glyphicon-remove remove-image"
                  onClick={() => this.setDeletingImages(el)}>
                </div>
              }
              <img src={path} style={imgStyle} />
            </div>
          );
        })}
        {editing && this.state.uploadedFiles && this.generateImages()}
        {editing &&
          <div
            className="admin-image-container"
            key={12412}
          >
            <Dropzone
              multiple={true}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
              <p>Drop an image or click to select a file to upload.</p>
            </Dropzone>
          </div>
        }
      </div>
    )
  }
}