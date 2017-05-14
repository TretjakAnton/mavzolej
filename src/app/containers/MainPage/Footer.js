import React from 'react';

class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    render() {
        return <div className="footer">
            <div>Footer {this.state.error}</div>
        </div>
    }
}

export default Footer;
