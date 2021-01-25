import React from "react";

import AuthService from "../services/authService";

import axios from "axios";

import { Button } from "react-bootstrap";

export default function UserAddToCartButton(props) {

    function addToCart() {
        const productId = props.id;

        const config = AuthService.getToken();
        
        // Since it is post you need to add a blank JSON body even if the backend doesn't require an
        axios.post(`http://localhost:8080/user/add-to-cart/${productId}`, '', config)
            .then(() => props.history.push("/cart"))
            .catch(err => console.log(err));
    }

    return (
        <Button onClick={addToCart}>Add To Cart</Button>
    )

}