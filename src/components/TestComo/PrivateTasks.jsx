import { useSelector } from "react-redux"
import { Redirect } from "react-router"
import {useHistory} from 'react-router-dom'

const PrivateLogIn = () => {
  const {isLoggedIn} = useSelector(state=>state.auth)
  const history = useHistory()
  
  if(history.location.pathname === '/tasks' && !isLoggedIn){
    return <Redirect to="/auth/log-in" />
  }

  return null
}

export default PrivateLogIn;
