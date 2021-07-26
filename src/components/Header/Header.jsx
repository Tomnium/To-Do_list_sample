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
        <div className="header-container">
            {
                auth.isLoggedIn ? <p className="username">Logged in as {auth.loggedInUser}</p> : <div></div>
            }
            {
                auth.isLoggedIn ?
                    <button className="auth-button" onClick={handleLogOut}>Log Out</button> :
                    <Link className="auth-button" to="/auth/log-in">Log in</Link>
            }
        </div>
    )
}