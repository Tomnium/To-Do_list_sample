import React from 'react'
import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {  } from '../../redux/actions'

export const Header = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch()
    }

    return (
        <div className = "header-container">
            { 
                auth.isLoggedIn || <p>Logged in as { auth.loggedInUser }</p>    
            }
            { 
                auth.isLoggedIn ? 
                    <Link className = "log-in-button" to = "/log-in">Log in</Link> :
                    <button className = "log-in-button">Log Out</button> 
            }
        </div>
    )
}