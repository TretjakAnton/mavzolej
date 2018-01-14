import React from 'react';
import Dropzone from 'react-dropzone';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap';
import { sendEmail, testMail } from '../api/serverRequests';
import ByForm from '../components/ByForm';

class SaleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.info.id_pam,
      type: this.props.type,
      price: this.props.info.price,
      image: this.props.image,
      selectedItems: null,
      selectionPrice: 0,
      uploadedFiles: null,
      textFIO: '',
      loading: false,
      error: null,
      success: null,
      email: '',
      emailValidation: null,
      informationValid: null,
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

  validEmail = (email) => {
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(email);
    if (!valid) {
      this.setState({ emailValidation: 'error' });
    } else {
      this.setState({ emailValidation: null });
    }
    return valid
  }

  validInfo = () => {
    if (this.state.textFIO == '') {
      this.setState({ informationValid: 'error' });
      return false;
    } else {
      this.setState({ informationValid: null });
      return true;
    }
  }

  sendOrder = () => {
    const {
      email,
      loading,
      selectedItems,
      uploadedFiles,
      textFIO,
      id,
      type,
    } = this.state;
    const sendData = {
      id: id,
      type: type,
      email: email,
      items: selectedItems,
      images: uploadedFiles,
      text: textFIO,
      price: this.getSummary(),
    };
    if (this.validEmail(email) && this.validInfo()) {
      this.setState({ loading: !loading })
      testMail(sendData).then((data) => {
        if (data.error) {
          this.setState({
            loading: !loading,
            error: data.error,
          })
        } else if (data.success) {
          this.setState({
            loading: !loading,
            success: data.success,
          })
        }
      })
    }
  };

  backToMail = () => {
    this.setState({
      error: null,
    });
  }

  textControl = (e) => {
    this.setState({
      textFIO: e.target.value,
      informationValid: null,
    })
  };

  emailControl = (e) => {
    this.setState({ email: e.target.value });
  }

  getSummary = () => {
    const { price, selectionPrice } = this.state;
    return parseInt(price) + parseInt(selectionPrice);
  }

  render() {
    const {
      image,
      id,
      textFIO,
      selectedItems,
      uploadedFiles,
      loading,
      success,
      error,
      emailValidation,
      informationValid,
    } = this.state;

    return (
      <div className="form-container">
        <div className="form-content">
          {loading && <div className="sending-email">Пожалуйста подождите, идет отправка сообщения</div>}
          {error &&
            <div className="sending-email">
              <div className="response">
                <span>Что то пошло не так, <br /> пожалуйста повторите попытку</span>
                <Button
                  onClick={this.backToMail}
                >
                  Повторить
                </Button>
              </div>
            </div>
          }
          {success &&
            <div className="sending-email">
              <span>Спасибо, ваше письмо успешно отправлено. <br /> Мы с вами свяжемся в ближайшее время</span>
            </div>
          }
          <span className="glyphicon glyphicon-remove form-close" onClick={this.close}></span>
          <div className="form-flex">
            <div className="form-left-side">
              <img src={image} height="200px" />
              <br />
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
                <FormGroup validationState={informationValid}>
                  <ControlLabel>Данные</ControlLabel>
                  <FormControl onChange={this.textControl} componentClass="textarea" placeholder="ФИО, Текст эпитафии, дополнительная информация" />
                </FormGroup>
                <FormGroup validationState={emailValidation}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    onChange={this.emailControl}
                    required
                    type="email"
                    placeholder="your.email@example.com"
                  />
                </FormGroup>
              </FormGroup>

              {emailValidation &&
                <div className="error-validation-text">
                  <span>Поле Email обязательно <br /> и должно содержать правильный email</span>
                </div>
              }
              {informationValid &&
                <div className="error-validation-text">
                  <span>Поле "Данные" должно содержать информацию<br />
                    достаточную для изготовления памятника <br />
                    (ФИО усебшего и дата рождения-смерти) <br />
                    возможно дополнительная информация</span>
                </div>
              }

              <Button
                onClick={this.sendOrder}
              >
                Заказать
              </Button>
              <span className="form-price">цена {this.getSummary()}</span>
            </div>
            <div className="form-right-side">
              <span>Ваш заказ:</span>
              <hr />
              {selectedItems && selectedItems.map((elem, key) => <span key={key}>{elem.name}: {elem.description}<br /></span>)}
              <br />
              {uploadedFiles && <div>
                <span>Прикрепленные изображения:</span><br />
                {uploadedFiles.map((val, key) => {
                  return <img key={key} src={val.preview} style={{ height: '150px' }} />
                })}
              </div>
              }
              <div>
                <span>Заполненная информация о усобшем <br /> и дополнительная информация</span>
                <p>{textFIO}</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default SaleForm;