import React from 'react';
import Menu from '../../components/Menu';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  };

  render() {
    return <div className="header">
      <Menu />
      {this.state.error}
    </div>
  }
}

export default Header;
