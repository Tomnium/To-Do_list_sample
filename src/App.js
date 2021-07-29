import './App.css'
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, useSelector } from 'react-redux'
import { reducer } from './redux/reducer'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { AuthForm, List, Header, PublicRoute } from './components'
import { signUpStart, logInStart, checkUserAuthStart } from './redux/actions'
import privatRoute from './utils/privatRoute'
import PrivateLogIn from './components/TestComo/PrivateLogIn'
import PrivateTasks from './components/TestComo/PrivateTasks'



const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

const App = () => {
  const { isLoggedIn, loggedInUser, userId } = store.getState().auth
  React.useEffect(() => {
    store.dispatch(checkUserAuthStart())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            {/* <PrivateTasks /> */}
            <Route path="/auth/log-in" render={() => <AuthForm title="log in" action={logInStart} />} />
            <Route path="/auth/sign-up" render={() => <AuthForm title="sign up" action={signUpStart} />} />
            <Route path="/tasks" render={() => <><Header /><List /></>} />
            <PrivateLogIn /> {/* if isLogedIn => redirect to /auth/log-in */}
            <Redirect to="/auth/log-in" />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider >
  )
}

export default App
