import { signUpStart } from "../../redux/actions"
import { AuthFinalForm } from "./AuthFinalForm"
import { AuthForm } from "./AuthForm"


export const SignUpForm = () => {
    return (
        <AuthFinalForm title="sign-up" action={signUpStart} />
    )
}