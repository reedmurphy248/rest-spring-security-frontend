import react, { useEffect, useState } from "react";
import AuthService from "../services/authService";

import { Jumbotron } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { useParams } from 'react-router-dom';

import axios from "axios";

export default function UpdateProduct(props) {

    const [productDetails, setProductDetails] = useState({
        productName: "",
        productDescription: "",
        productUnitPrice: 0
    });

    const [placeholders, setPlaceholders] = useState({
        productName: "",
        productDescription: "",
        productUnitPrice: 0
    })

    const [successCondition, setSuccessCondition] = useState({
        success: false
    });

    const params = props.match.params;

    useEffect(() => {

        const config = AuthService.getToken();

        const productId = params.id

        axios.get(`http://localhost:8080/admin/product/${productId}`, config)
            .then(res => {
                console.log(res.data);
                console.log(res.data.unitPrice);
                setPlaceholders({
                    productName: res.data.name,
                    productDescription: res.data.description,
                    productUnitPrice: res.data.unitPrice
                })
            })
            .catch(err => console.log(err));

    }, []);

    function handleChange(event) {

        event.preventDefault();

        setProductDetails(prevValue => {

            if (event.target.name === "name") {
                return {
                    productName: event.target.value,
                    productDescription: prevValue.productDescription,
                    productUnitPrice: prevValue.productUnitPrice
                }
            } else if (event.target.name === "description") {
                return {
                    productName: prevValue.productName,
                    productDescription: event.target.value,
                    productUnitPrice: prevValue.productUnitPrice
                }
            } else if (event.target.name === "unitPrice") {
                return {
                    productName: prevValue.productName,
                    productDescription: prevValue.productDescription,
                    productUnitPrice: event.target.value
                }
            }

        })

    }

    function updateProduct() {

        const config = AuthService.getToken();

        const product = {
            name: productDetails.productName,
            description: productDetails.productDescription,
            unitPrice: productDetails.productUnitPrice
        }

        axios.post(`http://localhost:8080/admin/${params.id}`, product, config)
            .then(res => {
                console.log(res);
                setProductDetails({
                    productName: "",
                    productDescription: "",
                    productUnitPrice: ""
                })
                setSuccessCondition({
                    success: true
                })
            })
            .catch(err => console.log(err));

    }

    return (
        <Jumbotron align="center" style={{ maxWidth: '50vw'}}>
            <h1>Welcome, { sessionStorage.getItem('firstName') }</h1>
            <h3>Update Product</h3>
            <Form>
            <Form.Group>
                <Form.Label>Product Name: {placeholders.productName} </Form.Label>
                <Form.Control onChange={handleChange} value={productDetails.productName} name="name" type="text" placeholder="Change Product Name" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product Description: {placeholders.productDescription}</Form.Label>
                <Form.Control onChange={handleChange} value={productDetails.productDescription} name="description" type="text" placeholder="Change Product Description" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product Price: {placeholders.productUnitPrice}</Form.Label>
                <Form.Control onChange={handleChange} name="unitPrice" type="text" placeholder="Change Product Unit Price" />
            </Form.Group>
            <Button onClick={updateProduct} variant="primary" type="submit">
                Update Product
            </Button>
            <Button
                onClick={() => {
                            AuthService.logout(() => {
                                props.history.push("/login");
                            })
                        }}>
                        Logout
            </Button>
            </Form>
        </Jumbotron>
    )
}