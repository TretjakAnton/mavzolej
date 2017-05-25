import React from 'react';
import Dropzone from 'react-dropzone';
import {
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap';
import ByForm from '../components/ByForm';

class SaleForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.info.id,
      price: this.props.info.price,
      image: this.props.image,
      selectedItems: null,
      selectionPrice: null,
      uploadedFiles: null,
    }
  }

  selectionsStatus = (itemsList, price) => {
    this.setState({
      selectedItems: itemsList,
      selectionPrice: price,
    });
  };

  close = () => {
    this.props.onClose();
  };

  onImageDrop(files) {
    this.setState({
      uploadedFiles: files
    });
  }

  render () {
    return(
      <div className="form-container">
        <div className="form-content">
          <span className="glyphicon glyphicon-remove form-close" onClick={this.close}></span>
          <div className="form-flex">
            <div className="form-left-side">
              <img src={this.state.image} height="200px"/>
              <br/>
              <span>номер {this.state.id}</span>
              <ByForm selectionHendler={this.selectionsStatus} />
              <hr />
              <Dropzone
                multiple={true}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <p>Перетащите изображение или нажмите для выбора файла</p>
              </Dropzone>
              {this.state.uploadedFiles && this.state.uploadedFiles.map((val, key) => {
                return <img key={key} src={val.preview} style={{height: '150px'}}/>
                })
              }
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Данные</ControlLabel>
                <FormControl componentClass="textarea" placeholder="ФИО, Текст эпитафии" />
              </FormGroup>
            </div>

            <div className="form-right-side">
              <span>Ваш заказ:</span>
              <br/>
              {this.state.selectedItems && this.state.selectedItems.map((elem, key) => <span key={key}>{elem.name}: {elem.description}</span>) }
              <br/>
              <span className="form-price">цена {this.state.price + this.state.selectionPrice}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default SaleForm;