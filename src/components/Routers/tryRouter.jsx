import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import { SET_FORM_ERROR_FALSE } from '../../redux/actionTypes'

const TryRouter = () => {
    const formError = useSelector(state => state.auth.formError)
    const dispatch = useDispatch()

    dispatch({ type: SET_FORM_ERROR_FALSE })
    return formError ? <Redirect to="/auth/log-in" /> : null
}

export default TryRouter
