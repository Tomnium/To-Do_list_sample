import './App.css'
import { List } from './common/List'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './store/reducer'
import thunk from 'redux-thunk'

const store = createStore(reducer, compose(applyMiddleware(thunk)))

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