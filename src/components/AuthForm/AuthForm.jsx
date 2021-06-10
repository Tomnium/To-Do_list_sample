import React, { useState } from 'react'
import './AuthForm.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const AuthForm = props => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const { title, action } = props

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(action(email, password))
        setEmail('')
        setPassword('')
    }

    return (
        <div className = "form-container">
            <form onSubmit = { handleSubmit }>
                <p className = "title">{ title }</p>
                <label>
                    Email
                    <input 
                        type = "email" 
                        value = { email } 
                        onChange = { handleEmailChange }
                        required/>
                </label>
                <label>
                    Password
                    <input 
                        type = "password" 
                        value = { password } 
                        onChange = { handlePasswordChange }
                        required/>
                </label>
                { title === 'log in' ? 
                    <p className = "link-text">Don't have an account? <Link className = "link" to = "sign-up">Sign Up</Link></p> :
                    <p className = "link-text">Already have an account? <Link className = "link" to = "log-in">Log In</Link></p>
                }
                <button type = "submit">{ title }</button>
            </form>
        </div>
    )
}