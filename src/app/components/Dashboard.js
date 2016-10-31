import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userLogin: this.props.userCredentials
        };
    };

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

