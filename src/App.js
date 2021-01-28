import logo from './logo.svg';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import LoginFuncCom from "./components/loginFuncCom"
import Login from "./components/login";
import Signup from "./components/signup";
import SecurePage from "./components/securepage";
import ProtectedRoute from "./components/protectedRoute";
import AdminRoute from "./components/adminRoute";
import AdminPage from "./components/adminPage";
import UserCart from "./components/userCart";
import UpdateProduct from "./components/updateProduct";
import PostSignup from "./components/postSignUp";
import PostCheckout from "./components/postCheckout";

function App() {

  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      {/* <Route exact path="/" component={LoginFuncCom} />
      <Route exact path="/login" component={LoginFuncCom} /> */}
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/post-signup/:firstName" component={PostSignup} />
      <ProtectedRoute exact path="/secure" component={SecurePage} />
      <ProtectedRoute exact path="/cart" component={UserCart} />
      <AdminRoute exact path="/admin" component={AdminPage} />
      <AdminRoute exact path="/update/:id" component={UpdateProduct} />
      <ProtectedRoute exact path ="/post-checkout" component={PostCheckout} />
    </Router>
  );
}

export default App;
