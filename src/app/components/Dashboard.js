import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTypes } from '../api/serverRequests'

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
            <div>{this.state.userLogin}</div>
        </div>
    }
}

function mapStateToProps(state) {
    return {
        userCredentials: state.userState
    }
}

export default connect(mapStateToProps, null)(Dashboard)

