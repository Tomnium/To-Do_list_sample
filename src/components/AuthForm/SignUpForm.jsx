import { signUpStart } from "../../redux/actions"
import { AuthForm } from "./AuthForm"


export const SignUpForm = () => {
    return (
        <AuthForm title="sign-up" action={signUpStart} />
    )
}