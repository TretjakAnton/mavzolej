import React from 'react';

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    render() {
        return <div className="flex-container">
            <div>Header</div>
        </div>
    }
}

export default Header;
