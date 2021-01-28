import react, { Component } from "react";

import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";

import AuthService from "../services/authService";

import { Link } from "react-router-dom";

export default function PostCheckout(props) {
    
    const params = props.match.params;

    return (
        <Jumbotron align="center" style={{ maxWidth: '50vw'}}>
            <h1>Thanks for Your Purchase, {params.firstName}!</h1>
            <h2>Continue <Link to="/secure">Shopping</Link></h2>
            <Button 
                onClick={() => {
                    AuthService.logout(() => {
                        props.history.push("/login");
                    })
                }}>
                Logout
            </Button>
        </Jumbotron>
    )
    
}