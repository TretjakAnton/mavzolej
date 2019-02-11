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
      <div className="row header-content">
        <div className="header-container">
          <div className="header-container__left">
              <div>Изготовление и установка</div>
              <div>памятников, мемориальных комплексов,</div>
              <div>оградок, столиков, скамеек.</div>
              <div>Работаем с 2008 года</div>
          </div>

          <div className="header-container__center">
            <Link to="home">
              <img src="../../../media/logo.png" className="img-responsive center-block" />
            </Link>
          </div>

          <div className="header-container__right">
            <div className="items">
              <p><span className="glyphicon glyphicon-earphone padding-right"></span>(050)406-50-07</p>
              <p><span className="glyphicon glyphicon-earphone padding-right"></span>(095)761-92-73</p>
              <p><span className="glyphicon glyphicon-earphone padding-right"></span>(096)850-83-01</p>
            </div>
            <div className="items">
              <p><span className="glyphicon glyphicon-envelope padding-right"></span><a href="mailto:mavzolej-master@yandex.ru">mavzolej.master@gmail.com</a></p>
              <p><span className="glyphicon glyphicon-map-marker padding-right"></span>
                <a target="blank" href="https://www.google.com.ua/maps/place/50%C2%B006'10.0%22N+36%C2%B007'50.9%22E/@50.1027854,36.1286213,17z/data=!3m1!4b1!4m9!1m2!2m1!1z0LMuINCU0LXRgNCz0LDRh9C4LCDQv9GA0L7QstGD0LvQvtC6INCa0L7QvNC80YPQvdCw0LvRjNC90YvQuSDihJYx!3m5!1s0x0:0x0!7e2!8m2!3d50.1027816!4d36.1308097?hl=ru">
                  <span>Харьковская область</span> 
                  <div>г. Дергачи, переулок Коммунальный №1</div>
                </a>
              </p>
            </div>
          </div>
        </div>
        <Menu />
      </div>
    </div>
  }
}

export default Header;
