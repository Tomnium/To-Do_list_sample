import { useSelector } from "react-redux"
import { Route, Switch } from "react-router"
import { List, SignUpForm } from "../components"

const privateRoute = () => {
    // todo if login
    // const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    if (true) {
        return (
            <Switch>
                <Route exact path='/auth/sign-up' component={SignUpForm} />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path='/tasks' component={List} />
            </Switch>
        )
    }
}
export default privateRoute