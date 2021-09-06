import axios from 'axios'
import React, { Component } from 'react'
import api from '../../components/api'
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            isSignup: false,
            redirect:false,
            giveMessage:false,
            message:''            
        }
    }
    formHandler = async (e) => {
        e.preventDefault()
        if (this.state.isSignup === false) {
            await api.post("/users/login", {
                email: this.state.email,
                password: this.state.password
            }).then(doc => {
                console.log(doc)
                if (doc.data.token !== undefined) {
                    localStorage.setItem("token=f9jCrLBFEFSseA^3", doc.data.token)
                    setTimeout(() => {
                        this.setState({
                            redirect:true,
                            giveMessage:false

                        })
                    },300)
                  
                }
                setTimeout(() => {
                    this.setState({giveMessage:true})

                },600)


            }).catch(err => {
                console.log(err)
            })
            this.setState({
                email: "",
                password: ""
            })


        } else {
            e.preventDefault()
            await api.post("/users/signup", {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }).then(doc => {
                console.log(doc.data)
                this.setState({
                    message:doc.data,
                    giveMessage:true
                })
            }).catch(err => {
                this.setState({
                   
                    giveMessage:false
                })
                console.log(err)
            })
            setTimeout(() => {
                this.setState({giveMessage:true})

            },300)
            this.setState({
                username: "",
                email: "",
                password: "",
                giveMessage:false

            })
        }

    }
    usernameHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    emailInputHanler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    passwordInputHanler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

   
    render() {
        if(this.state.redirect) {
            return window.location = "/"
        } else {
            return (
                
                <div className="form-main">
                {this.state.giveMessage && (<h1 className="form-message" style={{color:"red",padding:"1rem", }}> {this.state.isSignup ? this.state.message : "Please check email"}</h1>)}
                   
                    <form className="form" onSubmit={this.formHandler}>
                        <div className="form-ctl">
    
                        <h2 className="form-title">{this.state.isSignup ? "Registration" : "Login"}</h2>
                            {this.state.isSignup &&
                                (
                                    <div className="form-group">
                                        <input placeholder="enter your name" className="form-item" type="text" name="username" onChange={this.usernameHandler} value={this.state.username} />
                                    </div>
                                )}
    
                            <div className="form-group">
                                <input placeholder="enter your email" className="form-item" type="email" name="email" onChange={this.emailInputHanler} value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <input placeholder="enter your password" className="form-item" type="password" name="password" onChange={this.passwordInputHanler} value={this.state.password} />
                            </div>
                            <div className="form-group">
                                <button className="sumbit_button" type="submit">{this.state.isSignup ? "signup" : " login"}</button>
                            </div>
                            <span className="toggle-form"
                                onClick={() => this.setState({ isSignup: !this.state.isSignup, giveMessage:false })}>
                                {this.state.isSignup ? "Already register" : " not registerd"}
                            </span>
                        </div>
    
    
                    </form>
                    <div></div>
    
    
                </div>
    
    
            )
        }
  

    }
}







