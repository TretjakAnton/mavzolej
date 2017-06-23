import React from 'react';
import Menu from '../../components/Menu';
import { Link } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  };

  render() {
    return <div className="header">
      <div className="row">
        <div className="col-lg-offset-4 col-md-offset-4 col-sm-offset-2 col-lg-4 col-md-5 col-sm-8 col-xs-12">
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 upHead">
            <Link to="komplex">
              <img src="../../../media/squareDown.png" className="img-responsive" />
              <div className="header-menu">
                <img src="../../../media/komplexes.png" className="img-responsive inner center-block" />
                <p>Комплексы</p>
              </div>
              <img src="../../../media/squareDown.png" className="img-responsive" />
            </Link>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <Link to="home">
              <img src="../../../media/logo.png" className="img-responsive center-block" />
            </Link>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 upHead left">
            <Link to="izdel">
              <img src="../../../media/squareDown.png" className="img-responsive" />
              <div className="header-menu">
                <img src="../../../media/some2.png" className="img-responsivet inner center-block" />
                <p>Изделия</p>
              </div>
              <img src="../../../media/squareDown.png" className="img-responsive" />
            </Link>
          </div>
        </div>
      </div>
      <Menu />
    </div>
  }
}

export default Header;
