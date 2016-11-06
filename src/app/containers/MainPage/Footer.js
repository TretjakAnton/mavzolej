import React from 'react';

class Footer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    render() {
        return <div className="flex-container">
            <div>Footer</div>
        </div>
    }
}

export default Footer;
