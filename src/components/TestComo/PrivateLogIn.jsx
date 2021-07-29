import { useSelector } from "react-redux"
import { Redirect } from "react-router"

const PrivateLogIn = () => {
  const { isLoggedIn } = useSelector(state => state.auth)

  if (isLoggedIn) {
    return <Redirect to="/tasks" />
  }

  return null
}

export default PrivateLogIn;
