import React from "react";

import { Link } from "react-router-dom";

export default function CartVisitComponent(props) {

    return (
        <h2>Visit Your Cart <Link to="/cart">Here</Link></h2>
    )

}