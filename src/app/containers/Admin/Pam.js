import React, { Component } from 'react';
import { getPam } from '../../api/serverRequests';

class Pam extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    componentWillMount(){

    }

    render() {
        return <div className="flex-container">
            <div>{this.state.userLogin}</div>
        </div>
    }
}


export default Pam;