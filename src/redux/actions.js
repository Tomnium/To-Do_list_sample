import axios from '../axios'
import * as actionTypes from './actionTypes'

export const dataLoadStart = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DATA_LOAD_START })
            const response = await axios.get('/tasks/list')
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

export const addItemStart = (item) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.ADD_ITEM_START })
            const response = await axios.post(`/tasks/item`, { text: item })
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
            const response = await axios.put(`/tasks/item/${ id }`, { text: newText })
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
            const response = await axios.delete(`/tasks/item/${ id }`)
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
            const response = await axios.post('/auth/sign-up', { email, password })
            dispatch(response.status < 400 ?
                signUpSuccess(response.data.loggedInUser) :
                signUpError()
            )
        } catch {
            dispatch(signUpError())
        }
    }
}

const signUpSuccess = (email) => {
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        email
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
            const response = await axios.post('/auth/log-in', { email, password })
            console.log(response.status)
            dispatch(response.status < 400 ?
                logInSuccess(response.data.loggedInUser) :
                logInError()
            )
        } catch {
            dispatch(logInError())
        }
    }
}

const logInSuccess = (email) => {
    return {
        type: actionTypes.LOG_IN_SUCCESS,
        email
    }
}

const logInError = () => {
    return {
        type: actionTypes.LOG_IN_ERROR
    }
}