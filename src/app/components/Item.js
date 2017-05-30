import React from 'react';
import { Table, Glyphicon, Button } from 'react-bootstrap';
import Slider from './Slider';

const styles = {
  byButton: {
    width: "100px",
    alignSelf: "flex-end",
  },
  showHideButton: {
    width: "100%",
    outline: "none !important",
    margin: "10px 0",
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
    this.props.onSelect({image: this.state.mainImg, info: this.state.info});
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
    const imgExist = this.state.images.length > 0;
    const images = [this.state.mainImg, ...this.state.images];
    const sliderStatus = this.state.sliderInfo.status;
    const imageToShow = this.state.sliderInfo.imageToShow;
    const smallImgStatus = this.state.status;
    return (
      <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
        <div className="item">
        <div className="mainImg">
          <img src={this.state.mainImg} className="img-responsive" onClick={() => this.runSlider(this.state.mainImg)}/>
        </div>
          {imgExist &&
            <Button
              bsStyle="primary"
              bsSize="sm"
              onClick={this.showHideImages}
              style={styles.showHideButton}
            >
              показать остальные
              <span className="pull-right">
                {smallImgStatus ? <Glyphicon glyph="menu-up"/> : <Glyphicon glyph="menu-down"/>}
              </span>
            </Button>
          }
        {smallImgStatus &&
          <div className="images">
            {
              this.state.images.map((val, key) => {
                return <img key={key} src={val} className="img-responsive" onClick={() => this.runSlider(val)} />;
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
          <Button
            style={styles.byButton}
            onClick={this.openForm}
          >
            Заказать
            <Glyphicon glyph="shopping-cart" />
          </Button>
        </div>
        {sliderStatus && <Slider images={images} currImg={imageToShow} onClose={this.closeSlider}/> }
        </div>
      </div>
    )
  }
}

export default Item;