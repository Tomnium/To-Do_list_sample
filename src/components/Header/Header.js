import React from 'react'
import './Header.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Header = () => {
    const auth = useSelector(state => state.auth)

    return (
        <div className = "header-container">
            { 
                auth.isLoggedIn ? 
                    <p>Logged In as { auth.loggedInUser }</p> :
                    <Link className = "log-in-button" to = "/sign-in">Log in</Link>
            }
        </div>
    )
}