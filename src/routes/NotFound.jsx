import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div>
            <h1>404: Not Found</h1>
            <h3>Your brewery id is invalid. Please try again!</h3>
            <Link to="/">Back to home</Link>
        </div>
    )
}

export default NotFound;