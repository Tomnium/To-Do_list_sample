import './App.css'
import { List } from './common/List'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './redux/reducer'
import thunk from 'redux-thunk'

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

function App() {
  return (
    <Provider store = { store }>
      <div className="App">
        <List />
      </div>
    </Provider>
  )
}

export default App