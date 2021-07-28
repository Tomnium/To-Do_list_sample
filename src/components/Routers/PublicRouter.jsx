import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, property, restricted, to = "/", ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            property && restricted ?
                <Redirect to={to} />
                : <Component {...props} />
        )} />
    );
};
