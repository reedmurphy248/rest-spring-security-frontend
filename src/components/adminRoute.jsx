import React, { useState, useEffect, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/authService";

import axios from "axios";

const AdminRoute = ({ component: Component, ...rest }) => {

    const [credentials, updateCredentials] = useState({
        loggedIn: false,
        role: "USER",
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
                if (credentials.loggedIn && credentials.role === "ADMIN") {
                    return <Component {...props} />;
                }
                else if (credentials.loggedIn) {
                    return <Redirect to={
                        {
                            pathname: "/secure",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
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

export default AdminRoute;