import react, { Component } from "react";

import { Form } from "react-bootstrap";
import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function PostSignup(props) {
    
    const params = props.match.params;

    return (
        <Jumbotron align="center" style={{ maxWidth: '50vw'}}>
            <h1>Thanks for Signing Up, {params.firstName}!</h1>
            <h2>Continue to <Link to="/login">Sign In</Link></h2>
        </Jumbotron>
    )
    
}