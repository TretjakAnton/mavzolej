import React, { Component } from 'react';
import { getTypes } from '../api/serverRequests';

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            error: '',
        };
    };

    componentWillMount(){
        getTypes().then((data) => {
            if(data.error){
                this.setState({error: data.error})
            } else {
                console.log(data);
            }
        })
    }

    render() {
        return <div className="flex-container">
            <div>{this.state.error}</div>
        </div>
    }
}

export default Dashboard;

