import { Redirect, Route } from "react-router"

const PrivateAutorized = ({ isLogedIn }) => {

    return (
        <Route
            exact
            path="/"
            render={() => {
                return (
                    isLogedIn ?
                        <Redirect to='/tasks' /> :
                        <Redirect to='/auth/log-in' />
                )
            }}
        />
    )
}

export default PrivateAutorized
