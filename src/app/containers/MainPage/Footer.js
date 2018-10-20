import React from 'react';
import { Link } from 'react-router';

class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    render() {
      return <div className="footer row">
        {this.state.error}
        <div className="col-lg-6 col-md-6 contacts">
          <div className="textInfo">
            <div className="textInfo-items">
              <p><span className="glyphicon glyphicon-envelope padding-right"></span><a href="mailto:mavzolej-master@yandex.ru">mavzolej.master@gmail.com</a></p>
              <p><span className="glyphicon glyphicon-map-marker padding-right"></span><Link to='/aboutUs'>г. Дергачи, переулок Коммунальный №1</Link></p>
            </div>
            <div className="textInfo-items">
              <p><span className="glyphicon glyphicon-earphone padding-right"></span>(050)406-50-07</p>
              <p><span className="glyphicon glyphicon-earphone padding-right"></span>(095)761-92-73</p>
              <p><span className="glyphicon glyphicon-earphone padding-right"></span>(096)850-83-01</p>
            </div>
          </div>
        </div>
      </div>
    }
}

export default Footer;
