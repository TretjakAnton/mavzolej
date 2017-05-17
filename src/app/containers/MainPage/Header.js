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
      <div>Header</div><br/>
      <div>Header</div><br/>
      <div>Header</div><br/>
      <div>Header</div><br/>
      <div>Header</div><br/>
      {this.state.error}
    </div>
  }
}

export default Header;
