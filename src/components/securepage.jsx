import react, { useEffect, useState } from "react";
import AuthService from "../services/authService";

import axios from "axios";
import { Jumbotron } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { Card } from "react-bootstrap";

import AdminComponent from "./adminComponent";
import AdminDeleteProductButton from "./adminDeleteProductButton";
import AdminUpdateProductButton from "./adminUpdateProductButton";
import UserComponent from "./userComponent";
import UserAddToCartButton from "./userAddToCartButton";
import CartVisitComponent from "./cartVisitComponent";
import AdminCreateProductButton from "./adminCreateNewProductButton";

export default function SecurePage(props) {

    const [errorState, handleError] = useState({
        error: false
    });

    const [productList, updateProducts] = useState({
        products: []
    });

    useEffect(() => {

        if(props.history.location.state != null) {
            if (props.history.location.state.from.pathname === "/admin") {
                handleError({
                    error: true
                })
            }
        }

        getProductList();

    }, []);

    const getProductList = () => {

        const config = AuthService.getToken();

        axios.get('http://localhost:8080/user/all-products', config)
            .then(res => {
                updateProducts({
                    products: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })

    }

    const changeError = (event) => {

        handleError({
            error: false
        })

    }

    // const addToCart = (event) => {

    //     const productId = event.target.parentElement.parentElement.parentElement.id;

    //     const config = AuthService.getToken();
        
    //     // Since it is post you need to add a blank JSON body even if the backend doesn't require an
    //     axios.post(`http://localhost:8080/user/add-to-cart/${productId}`, '', config)
    //         .then(() => props.history.push("/cart"))
    //         .catch(err => console.log(err));

    // }

    return (
        <Jumbotron align="center" style={{ maxWidth: '50vw'}}>
            <h1>Welcome to the Secure Page, { sessionStorage.getItem('firstName') }</h1>
            <UserComponent component={CartVisitComponent}/>
            <div>
                <Button 
                    onClick={() => {
                        AuthService.logout(() => {
                            props.history.push("/login");
                        })
                    }}>
                    Logout
                </Button>
            </div>
            {
                errorState.error ? 
                <Alert variant="danger" onClose={changeError} dismissible>
                    Invalid Credentials: Admin Access Only
                </Alert>
                :
                null
            }
            <h2>Product List</h2>
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
                        <UserComponent component={UserAddToCartButton} id={product.id}/>
                        <AdminComponent component={AdminDeleteProductButton} id={product.id} functionProp={getProductList}/>
                        <AdminComponent component={AdminUpdateProductButton} id={product.id} />
                        </Card.Body>
                        </Card>
                    </div>
                )
            })}
            <AdminComponent component={AdminCreateProductButton} />
        </Jumbotron>

    )
}