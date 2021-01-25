import react, { useEffect, useState } from "react";

import AuthService from "../services/authService";

import axios from "axios";
import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function UserCart(props) {

    const [productList, updateUserCart] = useState({
        products: []
    });

    useEffect(() => {

        const config = AuthService.getToken();

        axios.get('http://localhost:8080/user/getCart', config)
            .then(res => {
                updateUserCart({
                    products: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })

    }, []);

    function removeFromCart(event) {
        event.preventDefault();

        const productId = event.target.parentElement.parentElement.parentElement.id;

        const config = AuthService.getToken();

        axios.post(`http://localhost:8080/user/remove-from-cart/${productId}`, '', config)
            .then(res => updateUserCart({
                products: res.data
            }))
            .catch(err => console.log(err));
    }

    return (
        <Jumbotron align="center" style={{ maxWidth: '50vw'}}>
        <h1> {sessionStorage.getItem('firstName')}'s Cart</h1>
        <h2>Cart Price: ${ productList.products.reduce(function(accumulator, product) {
            return accumulator + product.unitPrice;
        }, 0).toFixed(2) } </h2>
        <div>
            <Button 
                onClick={() => {
                    AuthService.logout(() => {
                        props.history.push("/login");
                    })
                }}>
                Checkout
            </Button>
        </div>
        <Button variant="warning"><Link to="/secure">Back to Products</Link></Button>
        { productList.products.map( product => {
            return (
                <div key={product.id} id={product.id}>
                    <Card style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{product.description}</Card.Subtitle>
                    <Card.Text>
                        Price: ${product.unitPrice}
                    </Card.Text>
                    <Button onClick={removeFromCart}>Remove From Cart</Button>
                    </Card.Body>
                    </Card>
                </div>
            )
        })}
    </Jumbotron>
    )

}