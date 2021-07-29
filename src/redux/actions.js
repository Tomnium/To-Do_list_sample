import Axios, { apiURL } from '../axios'
import * as actionTypes from './actionTypes'

export const dataLoadStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DATA_LOAD_START })
            const response = await Axios.get('/tasks/list')
            dispatch(response.status < 400 ?
                dataLoadSuccess(response.data) :
                dataLoadError()
            )
        } catch {
            dispatch(dataLoadError())
        }
    }
}

const dataLoadSuccess = (data) => {
    return {
        type: actionTypes.DATA_LOAD_SUCCESS,
        data
    }
}

const dataLoadError = () => {
    return {
        type: actionTypes.DATA_LOAD_ERROR
    }
}

export const addItemStart = (userID, text) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.ADD_ITEM_START })
            const response = await Axios.post(`/tasks/item`, { userID, text })
            dispatch(response.status < 400 ?
                addItemSuccess(response.data) :
                addItemError()
            )
        } catch {
            dispatch(addItemError())
        }
    }
}

const addItemSuccess = (data) => {
    return {
        type: actionTypes.ADD_ITEM_SUCCESS,
        data
    }
}

const addItemError = () => {
    return {
        type: actionTypes.ADD_ITEM_ERROR
    }
}

export const renameItemStart = (id, newText) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.RENAME_ITEM_START })
            const response = await Axios.put(`/tasks/item/${id}`, { text: newText })
            dispatch(response.status < 400 ?
                renameItemSuccess(response.data) :
                renameItemError()
            )
        } catch {
            dispatch(renameItemError())
        }
    }
}

const renameItemSuccess = (data) => {
    return {
        type: actionTypes.RENAME_ITEM_SUCCESS,
        data
    }
}

const renameItemError = () => {
    return {
        type: actionTypes.RENAME_ITEM_ERROR
    }
}

export const deleteItemStart = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DELETE_ITEM_START })
            const response = await Axios.delete(`/tasks/item/${id}`)
            dispatch(response.status < 400 ?
                deleteItemSuccess(response.data) :
                deleteItemError()
            )
        } catch {
            dispatch(deleteItemError())
        }
    }
}

const deleteItemSuccess = (data) => {
    return {
        type: actionTypes.DELETE_ITEM_SUCCESS,
        data
    }
}

const deleteItemError = () => {
    return {
        type: actionTypes.DELETE_ITEM_ERROR
    }
}

export const signUpStart = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.SIGN_UP_START })
            const response = await Axios.post('/auth/sign-up', { email, password })
            dispatch(response.status < 400 ?
                signUpSuccess(response) :
                signUpError()
            )
        } catch {
            dispatch(signUpError())
        }
    }
}

const signUpSuccess = (response) => {
    const { loggedInUser, accessToken } = response.data;

    localStorage.setItem('token', accessToken)
    localStorage.setItem('loggedInUserEmail', loggedInUser)

    // window.location.replace('/tasks')
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        email: loggedInUser
    }
}

const signUpError = () => {
    return {
        type: actionTypes.SIGN_UP_ERROR
    }
}

export const logInStart = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.LOG_IN_START })
            const response = await Axios.post('/auth/log-in', { email, password })

            dispatch(response.status < 400 ?
                logInSuccess(response) :
                logInError()
            )
        } catch {
            dispatch(logInError())
        }
    }
}

const logInSuccess = (response) => {
    const { loggedInUser, refreshToken, accessToken } = response.data;

    localStorage.setItem('loggedInUserEmail', loggedInUser)
    localStorage.setItem('token', accessToken)

    // window.location.replace('/tasks')

    return {
        type: actionTypes.LOG_IN_SUCCESS,
        email: loggedInUser
    }
}

const logInError = () => {
    return {
        type: actionTypes.LOG_IN_ERROR
    }
}

export const logOutStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.LOG_OUT_START })
            const response = await Axios.post(`/auth/log-out`)
            dispatch(response.status === 200 ?
                logOutSuccess() :
                logOutError())
        } catch {
            dispatch(logOutError())
        }
    }
}

const logOutSuccess = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUserEmail')

    // window.location.replace('/auth/log-in')
    return {
        type: actionTypes.LOG_OUT_SUCCESS
    }
}

const logOutError = () => {
    return {
        type: actionTypes.LOG_OUT_ERROR
    }
}

export const checkUserAuthStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.CHECK_AUTH_START })

            const response = await Axios.post(`/auth/user`)
            dispatch(response.status == 200 ?
                checkUserSuccess(response.data.data) :
                checkUserError())
        } catch {
            dispatch(checkUserError())
        }
    }
}

const checkUserSuccess = (data) => {
    const { id, email } = data;
    return {
        type: actionTypes.CHECK_AUTH_SUCCESS,
        id,
        email
    }
}

const checkUserError = () => {
    return {
        type: actionTypes.CHECK_AUTH_ERROR,
    }
}