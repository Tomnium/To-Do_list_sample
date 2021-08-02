import React from 'react'
import './Header.css'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logOutStart } from '../../redux/actions'

export const Header = () => {
    const history = useHistory()
    const { isLoggedIn, email } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(logOutStart())
        history.push('/auth/log-in')
    }

    return (
        <>
            <div className="header-container">
                {isLoggedIn ? <p className="username">Logged in as {email}</p> : <div></div>}
                <button className="auth-button" onClick={handleLogOut}>Log Out</button>
            </div>
        </>
    )
}