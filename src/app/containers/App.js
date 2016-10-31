import React, { Component } from 'react'

export default class App extends React.Component {
    render() {
        return <div id="content">
                {this.props.children}
               </div>
    }
}