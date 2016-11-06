import React from 'react';

class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    render() {
        return <div className="flex-container">
            <div>HOME</div>
        </div>
    }
}

export default HomePage;