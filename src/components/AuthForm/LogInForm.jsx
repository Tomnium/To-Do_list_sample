import { logInStart } from "../../redux/actions"
import { AuthForm } from "./AuthForm"


export const LoginForm = () => {
    return (
        <AuthForm title="log in" action={logInStart} />
    )
}
