import react, { Component } from "react";

import { Form } from "react-bootstrap";
import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";

import axios from 'axios';

export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }

    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleFirstNameChange = (event) => {
        this.setState({
            firstName: event.target.value
        })
    }

    handleLastNameChange = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    
    handleSubmit = (event) => {

        event.preventDefault();

        const reqBody = {
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:8080/authenticate/new', reqBody)
            .then(() => {
                this.props.history.push(`/post-signup/${reqBody.firstName}`);
            })
            .catch( err => {
                console.log(err);
            });

    }

    render() {
        return (
        <Jumbotron align="center" style={{ maxWidth: '50vw'}}>
            <h1>Signup</h1>
            <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={this.handleUsernameChange} value={this.state.username} name="username" type="text" placeholder="Enter Username" />
            </Form.Group>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange={this.handleFirstNameChange} value={this.state.firstName} name="first-name" type="text" placeholder="Enter First Name" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control onChange={this.handleLastNameChange} value={this.state.lastName} name="last-name" type="text" placeholder="Enter Last Name" />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control onChange={this.handleEmailChange} value={this.state.email} name="email" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.handlePasswordChange} value={this.state.password} name="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button onClick={this.handleSubmit} variant="primary" type="submit">
                Sign Up
            </Button>
            </Form>
        </Jumbotron>
       )
    }
    
}