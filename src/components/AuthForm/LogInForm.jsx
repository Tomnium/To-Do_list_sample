import { logInStart } from "../../redux/actions"
import { AuthFinalForm } from "./AuthFinalForm"


export const LogInForm = () => {
    return (
        <AuthFinalForm title="log in" action={logInStart} />
    )
}
