import React, { useState } from 'react';

import { Route, Redirect } from "react-router-dom";

import { Link } from "react-router-dom";

import AuthService from "../services/authService";

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import Jumbotron from 'react-bootstrap/Jumbotron';

import Alert from 'react-bootstrap/Alert';

import axios from "axios";

import Signup from "./signup";

export default function LoginFuncCom(props) {

    const [userDetails, changeUserDetails] = useState({
        username: "",
        password: ""
    });

    const [errorState, changeErrorState] = useState({
        error: false
    })

    const [credentials, updateCredentials] = useState({
        loggedIn: false
    })

    const handleChange = (event) => {
        event.preventDefault();
        changeUserDetails(prevValue => {
            return {
                username: event.target.value,
                password: prevValue.password
            }
        })
    }

    const handleError = () => {
        changeErrorState({
            error: false
        })
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        const reqBody = {
            username: userDetails.username,
            password: userDetails.password
        }
        axios.post('http://localhost:8080/authenticate', reqBody)
            .then( response => {

                AuthService.login(() => {
                    props.history.push("/secure");
                }, response.data.token, response.data.firstName, response.data.credentials);

                updateCredentials({
                    loggedIn: true
                });
            })
            .catch( err => {
                console.log(err);
                changeUserDetails({
                    username: "",
                    password: ""
                })
                changeErrorState({
                    error: true
                })
            });

    }

    const signUp = () => {
        props.history.push("/signup");
    }

    if (credentials.loggedIn) {
        return <Redirect to={
            {
                pathname: "/secure",
                state: {
                    from: props.location
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
                    <Form.Control onChange={handleChange} value={userDetails.username} name="username" type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} value={userDetails.password} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="submit">
                    Login
                </Button>
                <Button onClick={signUp}>Sign Up</Button>
                </Form>
                {
                    errorState.error ? 
                    <Alert variant="danger" onClose={handleError} dismissible>
                        Invalid Credentials
                    </Alert>
                    :
                    null
                }
                
            </Jumbotron>
        )
    }

}