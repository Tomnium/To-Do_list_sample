import { logInStart } from "../../redux/actions"
import { AuthFinalForm } from "./AuthFinalForm"
import { AuthForm } from "./AuthForm"


export const LogInForm = () => {
    return (
        <AuthFinalForm title="log in" action={logInStart} />
    )
}
