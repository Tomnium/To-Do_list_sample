import React from 'react'
import { useHistory } from 'react-router-dom'

const PrivateRoute = ({ component: Component, path, condition, ...rest }) => {
    const history = useHistory()
    React.useEffect(() => {
        condition && history.push(path)
    }, [condition])

    return (
        condition &&
        <Component component={Component} {...rest} />
    );
};

export default PrivateRoute
