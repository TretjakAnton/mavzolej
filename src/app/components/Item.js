import React from 'react';
import { Table, Glyphicon, Button } from 'react-bootstrap';
import { addBodyClass } from '../helpers';
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
      images: [],
      info: this.props.info,
      status: false,
      scrollPos: 0,
      sliderInfo: {
        imageToShow: null,
        status: false,
      }
    };
  };

  componentWillMount = () => {
    const { info } = this.state;
    let newImages = [];
    info.images.map((image) => {
      newImages.push(`../../../media/images${info.folder}/${image}`);
    });
    this.setState({ images: newImages });
  }

  showHideImages = () => {
    this.setState({ status: !this.state.status })
  };

  runSlider = (image) => {
    const scrollPos = document.body.scrollTop || document.documentElement.scrollTop;
    this.setState({
      sliderInfo: {
        imageToShow: image,
        status: true,
        scrollPos: scrollPos,
      }
    });
    addBodyClass(true);
  };

  openForm = () => {
    this.props.onSelect({image: this.state.images[0], info: this.state.info});
  };

  closeSlider = () => {
    this.setState({
      sliderInfo: {
        imageToShow: null,
        status: false,
        scrollPos: 0,
      }
    });
    addBodyClass(false, this.state.scrollPos);
  };

  render() {
    const { info, images, status } = this.state;
    const imgExist = images && images.length > 1;
    const sliderStatus = this.state.sliderInfo.status;
    const imageToShow = this.state.sliderInfo.imageToShow;
    return (
      <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3">
        <div className="item">
        <div className="mainImg">
          <img src={images[0]} className="img-responsive" onClick={() => this.runSlider(images[0])}/>
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
        {sliderStatus && <Slider images={images} currImg={imageToShow} onClose={this.closeSlider}/> }
        </div>
      </div>
    )
  }
}

export default Item;