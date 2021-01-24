import React, { Component } from 'react';

import AuthService from "../services/authService";

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import Jumbotron from 'react-bootstrap/Jumbotron';

import Alert from 'react-bootstrap/Alert';

import axios from "axios";

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleError = this.handleError.bind(this);

        this.state = {
            username: "",
            password: "",
            error: false
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
                console.log(response.data.token);
                console.log(response.data.firstName);

                AuthService.login(() => {
                    this.props.history.push("/secure");
                }, response.data.token, response.data.firstName, response.data.credentials)

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

    render() {
        return (
            // <form>
            //     <div>
            //         <label>Username: </label>
            //         <input name="username" onChange={this.handleUsernameChange} value={this.state.username}></input>
            //     </div>
            //     <div>
            //         <label>Password: </label>
            //         <input name="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
            //     </div>
            //     <button onClick={this.handleSubmit}>LOGIN</button>
            //     { this.state.error ? <div onClick={this.handleError}>Invalid Credentials</div> : null }
            // </form>
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
                    Login
                </Button>
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