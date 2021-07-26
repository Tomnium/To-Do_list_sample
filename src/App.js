import './App.css'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './redux/reducer'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { AuthForm, List, Header } from './components'
import { signUpStart, logInStart } from './redux/actions'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

function App() {
  return (
    <Provider store = { store }>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path = "/auth/log-in">
              <AuthForm title = "log in" action = { logInStart }/>
            </Route>
            <Route path = "/auth/sign-up">
              <AuthForm title = "sign up" action = { signUpStart }/>
            </Route>
            <Route path = "/tasks">
              <Header />
              <List />
            </Route>
            <Redirect to = "/auth/log-in"/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App