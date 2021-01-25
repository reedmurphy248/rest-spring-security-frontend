import React, { useState, useEffect, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/authService";

import axios from "axios";

const UserComponent = ({ component: Component, id: id, functionProp: functionProp, ...rest }) => {

    const [credentials, updateCredentials] = useState({
        loggedIn: false,
        role: "",
        verificationFinished: false
    })

    useEffect(() => {

        const config = AuthService.getToken();

        axios.get('http://localhost:8080/verify', config)
            .then(res => {
                updateCredentials({
                    loggedIn: true,
                    role: res.data,
                    verificationFinished: true
                })
            })
            .catch(err => {
                console.log(err);
                updateCredentials({
                    verificationFinished: true
                })
            })

    }, []);

    if (!credentials.verificationFinished) {
        return <div>Loading</div>
    }

    return (
        <Route
            {...rest}
            render={ props => {
                if (credentials.loggedIn && credentials.role === "USER") {
                    return <Component {...props} id={id} functionProp={functionProp} />;
                }
                else {
                    return null;
                }
            }}
        />
    )
}

export default UserComponent;