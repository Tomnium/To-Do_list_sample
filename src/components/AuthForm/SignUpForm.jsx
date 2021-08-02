import { signUpStart } from "../../redux/actions"
import { AuthFinalForm } from "./AuthFinalForm"


export const SignUpForm = () => {
    return (
        <AuthFinalForm title="sign up" action={signUpStart} />
    )
}