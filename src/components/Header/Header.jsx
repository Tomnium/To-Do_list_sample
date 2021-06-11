import React from 'react'
import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutStart } from '../../redux/actions'

export const Header = () => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOutStart())
    }

    return (
        <div className = "header-container">
            { 
                auth.isLoggedIn ? <p>Logged in as { auth.loggedInUser }</p> : <div></div>  
            }
            { 
                auth.isLoggedIn ? 
                    <button className = "log-in-button" onClick = { handleLogOut }>Log Out</button>  :
                    <Link className = "log-in-button" to = "/auth/log-in">Log in</Link>
            }
        </div>
    )
}