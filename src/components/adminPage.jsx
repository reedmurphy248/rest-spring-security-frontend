import react, { useEffect, useState } from "react";
import AuthService from "../services/authService";

import { Jumbotron } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

import axios from "axios";

export default function AdminPage(props) {

    const [productDetails, setProductDetails] = useState({
        productName: "",
        productDescription: "",
        productUnitPrice: 0
    });

    const [successCondition, setSuccessCondition] = useState({
        success: false
    });

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

    function submitProduct() {

        const config = AuthService.getToken();

        const product = {
            name: productDetails.productName,
            description: productDetails.productDescription,
            unitPrice: productDetails.productUnitPrice
        }

        axios.post('http://localhost:8080/admin/add-product', product, config)
            .then(() => {
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
            <h1>Welcome to the Admin Page, { sessionStorage.getItem('firstName') }</h1>
            <h3>Create Product</h3>
            <Form>
            <Form.Group>
                <Form.Label>Product Name</Form.Label>
                <Form.Control onChange={handleChange} value={productDetails.productName} name="name" type="text" placeholder="Enter Product Name" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product Description</Form.Label>
                <Form.Control onChange={handleChange} value={productDetails.productDescription} name="description" type="text" placeholder="Enter Product Description" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Product Price</Form.Label>
                <Form.Control onChange={handleChange} value={productDetails.productUnitPrice} name="unitPrice" type="text" placeholder="Enter Product Description" />
            </Form.Group>
            <Button onClick={submitProduct} variant="primary" type="submit">
                Create Product
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