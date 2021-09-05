import React, { Component } from 'react'
import Login from './Login'
import './form.css'
import { Redirect } from 'react-router-dom'
export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignup: false

        }
    }

    render() {
        return (
            <div className="main-form" >                
                   <Login Redirect={Redirect}/>
                    
             </div>
        )

    }
}







