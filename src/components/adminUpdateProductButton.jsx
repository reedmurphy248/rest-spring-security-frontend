import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/authService";

import { Button } from "react-bootstrap";

import axios from "axios";

export default function AdminUpdateProductButton(props) {

    const link = `/update/${props.id}`

    return (
        <Button variant="success" id={props.id}><Link to={link}>Update Product</Link></Button>
    )

}