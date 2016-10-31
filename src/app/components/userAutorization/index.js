import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Autorization extends React.Component {
  render() {
    return <div style={style}>
      {this.props.children}
    </div>
  }
}
