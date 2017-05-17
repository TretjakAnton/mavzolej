import React from 'react';

const styles = {
  openImage: {
    height: "400px"
  },
  openedContainer: {
    position: "absolute",
    top: "0",
    left: "0",
    height: "100vh",
    width: "100vw",
    backgroundColor: "RGBA(0, 0, 0, 0.7)",
  },
  arrowLeft: {
    fontSize: "140px",
    color: "white",
    position: "absolute",
    top: "50%",
    left: "0",
    transform: "translate(0, -50%)",
    cursor: "pointer",
  },
  arrowRight: {
    fontSize: "140px",
    color: "white",
    position: "absolute",
    top: "50%",
    right: "0",
    transform: "translate(0, -50%)",
    cursor: "pointer",
  },
  openedImage: {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  rightCount: {
    float: "right",
    color: "white",
  },
  closeIcon: {
    float: "right",
    color: "white",
    fontSize: "30px",
    marginRight: "-28px",
    cursor: "pointer",
  },
};

class Slider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      images: this.props.images,
      prev: null,
      current: this.props.currImg,
      next: null,
      length: null,
      indexCurr: null,
    }
  }

  componentWillMount = () => {
    this.imageOpened(this.state.current);
  };

  imageOpened = (image) => {
    const imageMass = this.state.images;
    const indexCurrEl = imageMass.indexOf(image);
    const prev = imageMass[indexCurrEl -1] || imageMass[imageMass.length-1];
    const next = imageMass[indexCurrEl +1] || imageMass[0];
    this.setState({
      status: true,
      prev: prev,
      current: image,
      next: next,
      length: imageMass.length,
      indexCurr: indexCurrEl + 1,
    });
  };

  prevImg = () => {
    this.imageOpened(this.state.prev);
  };

  nextImg = () => {
    this.imageOpened(this.state.next);
  };

  closeModal = () => {
    this.props.onClose()
  };

  render(){
    const imageToShow = this.state.current;
    return (
      <div className="slider-container">
        <span className="glyphicon glyphicon-menu-left slider-lef-arrow" onClick={this.prevImg}></span>
        <div className="slider-container-image">
          <span className="glyphicon glyphicon-remove slider-close" onClick={this.closeModal}></span><br/>
          <img className="slider-image" src={imageToShow} /><br/>
          <span className="slider-indicator">{this.state.indexCurr} из {this.state.length}</span>
        </div>
        <span className="glyphicon glyphicon-menu-right slider-right-arrow" onClick={this.nextImg}></span>
      </div>
    )
  }
}

export default Slider;