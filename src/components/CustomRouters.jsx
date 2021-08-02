import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"
import { PATH_LOG_IN, PATH_SIGN_UP, PATH_TASKS } from "../utils/path"
import PrivateRoute from "./PrivateRoute"
import { LogInForm } from "./AuthForm/LogInForm"
import { SignUpForm } from "./AuthForm/SignUpForm"
import { Header } from "./Header/Header"
import { List } from "./List/List"

const SingleComponent = () => {
    return (
        <>
            <Header />
            <List />
        </>
    )
}

function CustomRouter() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    return (
        <>
            <PrivateRoute component={SingleComponent} path={PATH_TASKS} condition={isLoggedIn} />
            <Route path={PATH_LOG_IN} component={LogInForm} exact />
            <Route path={PATH_SIGN_UP} component={SignUpForm} exact />
            <Redirect to={PATH_LOG_IN} />
        </>
    )
}

export default CustomRouter
