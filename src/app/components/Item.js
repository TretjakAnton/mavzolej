import React from 'react';
import { Table, Glyphicon, Button } from 'react-bootstrap';
import SimpleModalSlideshow from 'react-simple-modal-slideshow';
import Slider from "react-slick";

const slideSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <Button className="right-arrow"><Glyphicon glyph="chevron-right" /></Button>,
  prevArrow: <Button className="left-arrow"><Glyphicon glyph="chevron-left" /></Button>,
  lazyLoad: true
};

class Item extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      images: [],
      sliderImages: [],
      info: this.props.info,
      status: false,
      sliderInfo: {
        status: false,
        currentSlide: 0
      },
      currentShowSlide: 1
    };
  };

  componentWillMount = () => {
    const { info } = this.state;
    let newImages = [];
    let newSliderImages = [];
    info.images.map((image) => {
      newImages.push(`../../../media/images${info.folder}/${image}`);
      newSliderImages.push({
        media: (
          <img src={`../../../media/images${info.folder}/${image}`} />
        ),
      });
    });
    this.setState({
      images: newImages,
      sliderImages: newSliderImages
    });
  }

  showHideImages = () => {
    this.setState({ status: !this.state.status })
  };

  openForm = () => {
    this.props.onSelect({image: this.state.images[0], info: this.state.info});
  };

  closeSlider = () => {
    this.setState({
      sliderInfo: {
        status: false,
        currentSlide: 0,
      }
    });
  };

  handleNextPrev = (index) => {
    this.setState({
      sliderInfo: {
        status: true,
        currentSlide: index,
      }
    });
  };

  openSlideshow = (index) => {
    this.setState({
      sliderInfo: {
        status: true,
        currentSlide: index,
      }
    });
  }

  render() {
    const { info, images, sliderImages, currentShowSlide, sliderInfo } = this.state;
    const sliderStatus = sliderInfo.status;
    const currentSlide = sliderInfo.currentSlide;
    const imageToShow = sliderInfo.imageToShow;
    return (
      <div className="item col-xs-6 col-sm-6 col-md-4 col-lg-3">
        <div className="mainContainer">
          <Slider
            afterChange={
              (currentShowSlide) => {
                this.setState({ currentShowSlide: currentShowSlide + 1 })
              }
            }
            {...slideSettings}
          >
            {
              images.map((val, key) => {
                return (
                  <div key={key} className="slider-item">
                    <img
                      src={val}
                      className="img-responsive"
                      onClick={() => this.openSlideshow(key)}
                    />
                  </div>
                )
              })
            }
          </Slider>
          {images.length > 1 && <div className="slider-status">
            <span>{currentShowSlide} из {images.length}</span>
          </div>}
        </div>
        <div className="information">
          <Table responsive>
            <tbody>
              <tr>
                <td>Номер памятника:</td>
                <td>{info.id_pam}</td>
              </tr>
              {info.description && <tr>
                <td>Описание:</td>
                <td>{info.description}</td>
              </tr>}
              <tr>
                <td>Цена:</td>
                <td>{info.price}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Button
            className="shop-button"
            onClick={this.openForm}
          >
            Заказать
            <Glyphicon glyph="shopping-cart" />
        </Button>
        <SimpleModalSlideshow 
          slides={sliderImages}
          currentSlide={currentSlide}
          open={sliderStatus}
          onClose={this.closeSlider}
          onNext={this.handleNextPrev}
          onPrev={this.handleNextPrev}
          classNamePrefix="modal-slideshow"
        />
      </div>
    )
  }
}

export default Item;