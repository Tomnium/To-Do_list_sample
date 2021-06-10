import React, { useState } from 'react'
import './AuthForm.css'
import { Link } from 'react-router-dom'

export const AuthForm = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { title, submitFunction } = props

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className = "form-container">
            <form onSubmit = { submitFunction }>
                <p className = "title">{ title }</p>
                <label>
                    Email
                    <input 
                        type = "email" 
                        value = { email } 
                        onChange = { handleEmailChange }/>
                </label>
                <label>
                    Password
                    <input 
                        type = "password" 
                        value = { password } 
                        onChange = { handlePasswordChange }/>
                </label>
                { title === 'log in' ? 
                    <p>Don't have an account? <Link className = "link" to = "sign-up">Sign Up</Link></p> :
                    <p>Already have an account? <Link className = "link" to = "sign-in">Log In</Link></p>
                }
                <button type = "submit">{ title }</button>
            </form>
        </div>
    )
}