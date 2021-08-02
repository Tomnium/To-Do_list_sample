import './App.css'
import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './redux/reducer'
import thunk from 'redux-thunk'
import { BrowserRouter, Switch} from 'react-router-dom'
import { checkUserAuthStart } from './redux/actions'
import { Header, List, LogInForm, SignUpForm } from './components'
import CustomRouter from './components/CustomRouters'
import { ToastContainer } from 'react-toastify'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

const App = () => {

  React.useEffect(() => {
    store.dispatch(checkUserAuthStart())
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <ToastContainer />
          <Switch>
              <CustomRouter />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider >
  )
}

export default App
