import React, { useState, useEffect, Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/authService";

import { Button } from "react-bootstrap";

import axios from "axios";

export default function AdminDeleteProductButton(props) {

    function deleteProduct(event) {

        event.preventDefault();

        const config = AuthService.getToken();

        axios.post(`http://localhost:8080/admin/delete-product/${props.id}`, "", config)
            .then(() => props.functionProp())
            .catch(err => console.log(err));

    }

    return (
        <Button variant="danger" onClick={deleteProduct}>Admin Button</Button>
    )

}