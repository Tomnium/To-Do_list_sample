import './App.css'
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider} from 'react-redux'
import { reducer } from './redux/reducer'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Header, List, LoginForm, SignUpForm } from './components'
import { signUpStart, logInStart, checkUserAuthStart } from './redux/actions'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

const App = () => {

  const { isLogedIn } = store.getState().auth;

  React.useEffect(() => {
    store.dispatch(checkUserAuthStart())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Switch>
              
            <Route exact path="/" render={() => {
                return ( isLogedIn ?
                    <Redirect to='/tasks' /> :
                    <Redirect to='/auth/log-in' />)}}
            />
            <Route exact path='/auth/log-in' component={LoginForm} />
            <Route exact path='/auth/sign-up' component={SignUpForm} />
            <Route exact path="/tasks" render={()=><><Header /><List /></>} />
            <Redirect to='/' />

          </Switch>
        </BrowserRouter>
      </div>
    </Provider >
  )
}

export default App