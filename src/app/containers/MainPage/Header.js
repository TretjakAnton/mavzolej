import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  };

  render() {
    return <div className="header">
      <div>Header</div>
      {this.state.error}
    </div>
  }
}

export default Header;
