import React from 'react';
import { Table } from 'react-bootstrap';
import Slider from './Slider';
import SaleForm from '../containers/SaleForm'

const styles = {
  mainImage: {
    height: "200px"
  },
  images: {
    height: "100px"
  },
};

class Item extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      mainImg: this.props.mainImg,
      images: this.props.images,
      info: this.props.info,
      status: false,
      formStatus: false,
      sliderInfo: {
        imageToShow: null,
        status: false,
      }
    };
  };

  showHideImages = () => {
    this.setState({ status: !this.state.status })
  };

  runSlider = (image) => {
    this.setState({
      sliderInfo: {
        imageToShow: image,
        status: true,
      }
    })
  };

  openForm = () => {
    this.setState({ formStatus: true });
  };

  closeForm = () => {
    this.setState({ formStatus: false });
  };

  closeSlider = () => {
    this.setState({
      sliderInfo: {
        imageToShow: null,
        status: false,
      }
    })
  };

  render() {
    const info = this.state.info;
    const images = [this.state.mainImg, ...this.state.images];
    const sliderStatus = this.state.sliderInfo.status;
    const imageToShow = this.state.sliderInfo.imageToShow;
    const formStatus = this.state.formStatus;
    const smallImgStatus = this.state.status;
    return (
      <div className="item col-xs-6 col-md-4 col-lg-3">
        <div className="mainImg">
          <img src={this.state.mainImg} style={styles.mainImage} onClick={() => this.runSlider(this.state.mainImg)}/>
        </div>
        <button onClick={this.showHideImages}>показать остальные</button>
        {smallImgStatus &&
          <div className="images">
            {
              this.state.images.map((val, key) => {
                return <img key={key} src={val} style={styles.images} onClick={() => this.runSlider(val)} />;
              })
            }
          </div>
        }
        <div className="information">
          <Table responsive>
            <tbody>
              <tr>
                <td>Номер памятника:</td>
                <td>{info.id}</td>
              </tr>
              <tr>
                <td>Цена:</td>
                <td>{info.price}</td>
              </tr>
            </tbody>
          </Table>
          <button className="btn btn-default" onClick={this.openForm}>Заказать</button>
        </div>
        {sliderStatus && <Slider images={images} currImg={imageToShow} onClose={this.closeSlider}/> }
        {formStatus && <SaleForm info={info} image={this.state.mainImg} onClose={this.closeForm}/> }
      </div>
    )
  }
}

export default Item;