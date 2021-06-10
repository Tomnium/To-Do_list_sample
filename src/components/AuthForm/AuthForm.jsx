import React, { useState } from 'react'
import './AuthForm.css'

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
                <p>{ title }</p>
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
                <button type = "submit">{ title }</button>
            </form>
        </div>
    )
}