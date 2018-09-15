import React from 'react';
import { Table, Glyphicon, Button } from 'react-bootstrap';
import { addBodyClass } from '../helpers';
import Slider from './Slider';
import SimpleModalSlideshow from 'react-simple-modal-slideshow';

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
      images: [],
      sliderImages: [],
      info: this.props.info,
      status: false,
      sliderInfo: {
        status: false,
        currentSlide: 0
      }
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
    const { info, images, status, sliderImages } = this.state;
    const imgExist = images && images.length > 1;
    const sliderStatus = this.state.sliderInfo.status;
    const currentSlide = this.state.sliderInfo.currentSlide;
    const imageToShow = this.state.sliderInfo.imageToShow;
    return (
      <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
        <div className="item">
        <div className="mainImg">
          <img src={images[0]} className="img-responsive" onClick={() => this.openSlideshow(0)}/>
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
                {status ? <Glyphicon glyph="menu-up"/> : <Glyphicon glyph="menu-down"/>}
              </span>
            </Button>
          }
        {status &&
          <div className="images">
            {
              this.state.images.map((val, key) => {
                return <img key={key} src={val} className="img-responsive" onClick={() => this.openSlideshow(key)} />;
              })
            }
          </div>
        }
        <div className="information">
          <Table responsive>
            <tbody>
              <tr>
                <td>Номер памятника:</td>
                <td>{info.id_pam}</td>
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
        <SimpleModalSlideshow 
          slides={sliderImages}
          currentSlide={currentSlide}
          open={sliderStatus}
          onClose={this.closeSlider}
          onNext={this.handleNextPrev}
          onPrev={this.handleNextPrev}
          classNamePrefix="modal-slideshow"
        />
        {/* sliderStatus && <Slider images={images} currImg={imageToShow} onClose={this.closeSlider}/> */}
        </div>
      </div>
    )
  }
}

export default Item;