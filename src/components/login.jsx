import React, { Component } from 'react';

import { Route, Redirect } from "react-router-dom";

import { Link } from "react-router-dom";

import AuthService from "../services/authService";

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import Jumbotron from 'react-bootstrap/Jumbotron';

import Alert from 'react-bootstrap/Alert';

import axios from "axios";

import Signup from "./signup";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this);
        this.signUp = this.signUp.bind(this);

        this.state = {
            username: "",
            password: "",
            error: false,
            loggedIn: false
        }

    }

    handleUsernameChange = (event) => {
        event.preventDefault();
        this.setState({
            username: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleError = () => {

        this.setState({
            error: false
        })

    }

    handleSubmit = (event) => {

        event.preventDefault();

        const reqBody = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://localhost:8080/authenticate', reqBody)
            .then( response => {

                const history = this.props.history;

                AuthService.login(() => {
                    history.push("/secure");
                }, response.data.token, response.data.firstName, response.data.credentials);

                this.setState({
                    loggedIn: true
                })

                // AuthService.login(() => {
                //     this.props.history.push("/secure")
                // }, response.data.token, response.data.firstName, response.data.credentials)
            })
            .catch( err => {
                console.log(err);
                this.setState({
                    username: "",
                    password: "",
                    error: true
                })
            });

    }

    signUp = () => {
        this.props.history.push("/signup");
    }

    render() {

        if (this.state.loggedIn) {
            return <Redirect to={
                {
                    pathname: "/secure",
                    state: {
                        from: this.props.location
                    }
                }
            }/>
        } else {
            return (
                <Jumbotron align="center" style={{ maxWidth: '50vw'}}>
                    <h1>Login</h1>
                    <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={this.handleUsernameChange} value={this.state.username} name="username" type="text" placeholder="Enter Username" />
                    </Form.Group>
    
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handlePasswordChange} value={this.state.password} name="password" type="password" placeholder="Password" />
                    </Form.Group>
                    <Button onClick={this.handleSubmit} variant="primary" type="submit">
                        Login-TESTING
                    </Button>
                    <Button onClick={this.signUp}>Sign Up</Button>
                    </Form>
                    {
                        this.state.error ? 
                        <Alert variant="danger" onClose={this.handleError} dismissible>
                            Invalid Credentials
                        </Alert>
                        :
                        null
                    }
                    
                </Jumbotron>
            )
        }
    }

}