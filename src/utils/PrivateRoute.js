import { useSelector } from "react-redux"
import { Redirect, Route, Switch } from "react-router"
import { Header, List, LoginForm, SignUpForm } from "../components"

const PrivateRouteOwn = () => {
  // todo if login
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  console.log(isLoggedIn)
  if (isLoggedIn) {
    return (
      <Switch>
        {/* <h1>True</h1> */}
        <Route exact path='/tasks' render={() => <><Header /><List /></>} />
        <Redirect to='/tasks' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        {/* <h1>False</h1> */}
        <Route exact path='/auth/log-in' component={LoginForm} />
        <Route exact path='/auth/sign-up' component={SignUpForm} />
        <Redirect to="/auth/log-in" />
      </Switch>
    )
  }
}
export default PrivateRouteOwn