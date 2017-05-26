import React from 'react';
import Footer from './Footer';
import Header from './Header';

class MainPage extends React.Component {
  render() {
    return (
      <div id="content">
        <Header />
        <div className="container-content">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default MainPage;