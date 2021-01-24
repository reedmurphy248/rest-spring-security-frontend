import logo from './logo.svg';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./components/login";
import Signup from "./components/signup";
import SecurePage from "./components/securepage";
import ProtectedRoute from "./components/protectedRoute";
import AdminRoute from "./components/adminRoute";
import AdminPage from "./components/adminPage";
import UserCart from "./components/userCart";
import UpdateProduct from "./components/updateProduct";

function App() {

  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <ProtectedRoute exact path="/secure" component={SecurePage} />
      <ProtectedRoute exact path="/cart" component={UserCart} />
      <AdminRoute exact path="/admin" component={AdminPage} />
      <AdminRoute exact path="/update/:id" component={UpdateProduct} />
    </Router>
  );
}

export default App;
