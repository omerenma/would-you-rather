import React, { Component} from "react";
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {noAuthedUser} from '../actions/setAuthedUser'

class Logout extends Component {
    componentDidMount(){
        const {dispatch} = this.props;
        dispatch(noAuthedUser(null))
    }
    render(){
        return <Redirect to="/" />
    }
}

export default connect(null)(Logout)