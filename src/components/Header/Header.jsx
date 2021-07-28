import React from 'react'
import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { logOutStart } from '../../redux/actions'

export const Header = () => {
    const history = useHistory()
    const { isLoggedIn, loggedInUser } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOutStart())
        // history.push('/auth/log-in')
    }


    return (
        <div className="header-container">
            {
                isLoggedIn ? <p className="username">Logged in as {loggedInUser}</p> : <div></div>
            }
            {
                // isLoggedIn ?
                <button className="auth-button" onClick={handleLogOut}>Log Out</button> //:
                // <Link className="auth-button" to="/auth/log-in">Log in</Link>
            }
        </div>
    )
}