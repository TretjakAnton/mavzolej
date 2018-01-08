import React from 'react';
import Dropzone from 'react-dropzone';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import { sendEmail } from '../api/serverRequests';
import ByForm from '../components/ByForm';

class SaleForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.info.id_pam,
      price: this.props.info.price,
      image: this.props.image,
      selectedItems: null,
      selectionPrice: 0,
      uploadedFiles: null,
      textFIO: '',
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

  sendOrder = () => {
    const sendData = {
      items: this.state.selectedItems,
      images: this.state.uploadedFiles,
      text: this.state.textFIO,
      price: this.state.price + this.state.selectionPrice,
    };
    sendEmail(sendData).then((data) => {
      console.log(data);
    })
  };

  textControl = (e) => {
    this.setState({
      textFIO: e.target.value
    })
  };

  render () {
    const {
      image,
      id,
      textFIO,
      selectedItems,
      uploadedFiles,
      price,
      selectionPrice
    } = this.state;
    const getSummary = () => parseInt(price) + parseInt(selectionPrice);
    return(
      <div className="form-container">
        <div className="form-content">
          <span className="glyphicon glyphicon-remove form-close" onClick={this.close}></span>
          <div className="form-flex">
            <div className="form-left-side">
              <img src={image} height="200px"/>
              <br/>
              <span>номер {id}</span>
              <ByForm selectionHendler={this.selectionsStatus} />
              <hr />
              <Dropzone
                multiple={true}
                accept="image/*"
                onDrop={this.onImageDrop.bind(this)}>
                <p>Перетащите изображение или нажмите на поле для выбора файла</p>
              </Dropzone>
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Данные</ControlLabel>
                <FormControl onChange={this.textControl} componentClass="textarea" placeholder="ФИО, Текст эпитафии" />
              </FormGroup>

              <Button
                onClick={this.sendOrder}
              >
                Заказать
              </Button>
            </div>
            <div className="form-right-side">
              <span>Ваш заказ:</span>
              <hr/>
              {selectedItems && selectedItems.map((elem, key) => <span key={key}>{elem.name}: {elem.description}</span>) }
              <br/>
              {uploadedFiles && uploadedFiles.map((val, key) => {
                return <img key={key} src={val.preview} style={{height: '150px'}}/>
              })
              }
              <p>{textFIO}</p>
              <br/>
              <span className="form-price">цена {getSummary()}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default SaleForm;