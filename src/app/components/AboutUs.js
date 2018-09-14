import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    center={{ lat: 50.102680, lng: 36.130792 }}
    options={{ language: 'ru' }}
  >
    <Marker
      position={new google.maps.LatLng(50.102680, 36.130792)}
    />
  </GoogleMap>
));

class AboutUs extends React.Component {

  shouldComponentUpdate = () => {
    return false;
  };

  render() {
    return (
      <div className="row">
        <div className="content col-lg-offset-1 col-md-offset-1 col-lg-10 col-md-10 col-sm-12 col-xs-12">
          <div className="clo-lg-6 col-md-6 col-sm-6 col-xs-12">
            <GettingStartedGoogleMap
              containerElement={
                <div style={{ height: "400px" }} />
              }
              mapElement={
                <div style={{ height: "400px" }} />
              }
            />
          </div>
          <div className="clo-lg-6 col-md-6 col-sm-6 col-xs-12">
            <h1>НАШИ КООРДИНАТЫ:</h1>
            <p>Харьковская область, г. Дергачи,  переулок Коммунальный, 1<br />
              Телефоны:  050-406-50-07, 095-761-92-73<br />
              Ориентир в Дергачах:<br />
              при движении со стороны Харькова - по улице Петровского после перекрестка, регулируемого светофором - второй поворот направо;<br />
              при движении со стороны Слатино - по улице Петровского порядка 500 метров от стадиона поворот налево.<br />
              E-mail: mavzolej-master@gmail.com<br /></p>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutUs;