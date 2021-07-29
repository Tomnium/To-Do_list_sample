import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router"
import { useHistory } from 'react-router-dom'
import { logInStart } from "../../redux/actions"
import { AuthForm } from "../AuthForm/AuthForm"

const PrivateHome = () => {
    const { isLoggedIn } = useSelector(state => state.auth)

    const history = useHistory()

    if (!isLoggedIn && history.location.pathname === '/') {
        return (
            <Route path="/" exact>
                <AuthForm title="log in" action={logInStart} />
            </Route>
        )
    }

    // (
    //     <Route path="/" >
    //         <AuthForm title="log in" action={logInStart} />
    //     </Route>
    // )
    return null
}

export default PrivateHome
