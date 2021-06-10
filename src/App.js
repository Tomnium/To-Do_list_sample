import './App.css'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './redux/reducer'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthForm, List,  } from './components'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

function App() {
  return (
    <Provider store = { store }>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path = "/sign-in">
              <AuthForm title = "sign in" submit = { () => {} }/>
            </Route>
            <Route path = "/sign-up">
              <AuthForm title = "sign up" submit = { () => {} }/>
            </Route>
            <Route path = "/" exact component = { List }/>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App