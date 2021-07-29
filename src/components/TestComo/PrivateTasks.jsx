import { List } from '../List/List'
import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import { useHistory } from 'react-router-dom'
import { Header } from "../Header/Header"

const PrivateLogIn = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()

  if (history.location.pathname === '/tasks') {
    if (!isLoggedIn) {
      return <Redirect to="/auth/log-in" />
    } else {
      return (
        <>
          <Header />
          <List />
        </>
      )
    }
  } else {
    return null
  }
}

export default PrivateLogIn;
