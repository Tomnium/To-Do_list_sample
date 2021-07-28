import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, property = true, to = "/", ...rest }) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            property ?
                <Component {...props} />
                : <Redirect to={to} />
        )} />
    );
};
