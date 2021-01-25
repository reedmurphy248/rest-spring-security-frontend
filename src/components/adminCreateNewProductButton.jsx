import React, { useState, useEffect, Component } from "react";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";

export default function AdminCreateProductButton(props) {

    return (
        <Button variant="success"><Link to="/admin">Create New Product</Link></Button>
    )

}