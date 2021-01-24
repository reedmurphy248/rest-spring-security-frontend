import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/authService";

import axios from 'axios';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const [credentials, updateCredentials] = useState({
        loggedIn: false,
        verificationFinished: false
    })

    useEffect(() => {

        const config = AuthService.getToken();

        axios.get('http://localhost:8080/verify', config)
            .then(res => {
                updateCredentials({
                    loggedIn: true,
                    verificationFinished: true
                })
            })
            .catch(err => {
                console.log(err);
                updateCredentials({
                    verificationFinished: true
                })
            })

    }, [])

    if (!credentials.verificationFinished) {
        return (
            <div>Loading Credentials</div>
        )
    }

    return (
        <Route
            {...rest}
            render={ props => {
                if (credentials.loggedIn) {
                    return <Component {...props} />;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }}
        />
    )
}

export default ProtectedRoute;