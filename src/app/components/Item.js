import React from 'react';
import { Table } from 'react-bootstrap';

const styles = {
  mainImage: {
    height: "200px"
  },
  images: {
    height: "100px"
  },
  openImage: {
    height: "400px"
  },
  openedContainer: {
    position: "absolute",
    marginTop: "-150px",
    top: "0",
    left: "0",
    height: "100vh",
    width: "102vw",
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

class Item extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      mainImg: this.props.mainImg,
      images: this.props.images,
      info: this.props.info,
      status: false,
      openedImages: {
        status: false,
        prev: null,
        current: null,
        next: null,
        length: null,
        indexCurr: null,
      }
    };
  };

  imageOpened = (image) => {
    const imageMass = [this.state.mainImg, ...this.state.images];
    const indexCurrEl = imageMass.indexOf(image);
    const prev = imageMass[indexCurrEl -1];
    const next = imageMass[indexCurrEl +1];
    this.setState({
      openedImages: {
        status: true,
        prev: prev,
        current: image,
        next: next,
        length: imageMass.length +1,
        indexCurr: indexCurrEl +1,
      }
    });
  };

  showHideImages = () => {
    this.setState({ status: !this.state.status })
  };

  render() {
    const info = this.state.info;
    const imageInfo = this.state.openedImages;
    const closeUpStatus = this.state.openedImages.status;
    const imageToShow = this.state.openedImages.current;
    return (
      <div className="item col-xs-6 col-md-4 col-lg-3">
        <div className="mainImg">
          <img src={this.state.mainImg} style={styles.mainImage} onClick={() => this.imageOpened(this.state.mainImg)}/>
        </div>
        <button onClick={this.showHideImages}>показать остальные</button>
        {this.state.status &&
          <div className="images">
            {
              this.state.images.map((val, key) => {
                return <img key={key} src={val} style={styles.images} onClick={() => this.imageOpened(val)} />;
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
        </div>
        {closeUpStatus &&
          <div style={styles.openedContainer}>
            <span className="glyphicon glyphicon-menu-left" style={styles.arrowLeft}></span>
            <div style={styles.openedImage}>
              <span className="glyphicon glyphicon-remove" style={styles.closeIcon}></span><br/>
              <img src={imageToShow}  style={styles.openImage}/><br/>
              <span style={styles.rightCount}>{imageInfo.indexCurr} из {imageInfo.length}</span>
            </div>
            <span className="glyphicon glyphicon-menu-right" style={styles.arrowRight}></span>
          </div>
        }
      </div>
    )
  }
}

export default Item;