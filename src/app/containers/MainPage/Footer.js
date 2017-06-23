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
        <div className="col-lg-4 col-md-3 contacts">
          <div className="textInfo">
            <p><span className="glyphicon glyphicon-earphone padding-right"></span>(050)406-50-07</p>
            <p><span className="glyphicon glyphicon-earphone padding-right"></span>(095)761-92-73</p>
            <p><span className="glyphicon glyphicon-earphone padding-right"></span>(096)850-83-01</p>
            <p><span className="glyphicon glyphicon-envelope padding-right"></span><a href="mailto:mavzolej-master@yandex.ru">mavzolej-master@yandex.ru</a></p>
            <p><span className="glyphicon glyphicon-map-marker padding-right"></span><Link to='aboutUs'>г. Дергачи, переулок Коммунальный №1</Link></p>
          </div>
        </div>
      </div>
    }
}

export default Footer;
