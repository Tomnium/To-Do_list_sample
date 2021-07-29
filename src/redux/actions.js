import Axios from '../axios'
import * as actionTypes from './actionTypes'

export const dataLoadStart = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DATA_LOAD_START })
            const response = await Axios.get(`/tasks/list/${userId}`)
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

export const addItemStart = (userId, text) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.ADD_ITEM_START })
            const response = await Axios.post(`/tasks/item`, { userId, text })
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

export const renameItemStart = (id, newText, userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.RENAME_ITEM_START })
            const params = JSON.stringify({usr:userId, id})

            const response = await Axios.put(`/tasks/item/${params}`, { text: newText })
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

export const deleteItemStart = (id, userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DELETE_ITEM_START })
            const params = JSON.stringify({usr:userId, id})

            const response = await Axios.delete(`/tasks/item/${params}`)
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
        } catch(e) {
            dispatch(signUpError())
            throw new Error(e)
        }
    }
}

const signUpSuccess = (response) => {
    const { user, accessToken } = response.data;
    localStorage.setItem('token', accessToken)
    // window.location.replace('/tasks')
    return {
        type: actionTypes.SIGN_UP_SUCCESS,
        email: user.email, 
        userId: user.id
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
            const response = await Axios.post('/auth/log-in', { email, password }) // .catch(err=>{throw new Error(err)})
            dispatch(response.status < 400 ?
                logInSuccess(response) :
                logInError()
            )
        } catch(e) {
            dispatch(logInError())
            throw new Error(e)
        }
    }
}

const logInSuccess = (response) => {
    const { user, accessToken, tasks} = response.data;
    localStorage.setItem('token', accessToken)
    // window.location.replace('/tasks')
    return {
        type: actionTypes.LOG_IN_SUCCESS,
        email: user.email, 
        userId: user.id, 
        tasks
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
            dispatch(response.status === 200 ?
                checkUserSuccess(response.data) :
                checkUserError())
            // if(response.status === 200) dispatch({type: actionTypes.DATA_LOAD_START})
        } catch {
            dispatch(checkUserError())
        }
    }
}

const checkUserSuccess = (data) => {
    const { id, email } = data.data
    const {tasks} = data
    return {
        type: actionTypes.CHECK_AUTH_SUCCESS,
        userId: id,
        email,
        tasks
    }
}

const checkUserError = () => {
    return {
        type: actionTypes.CHECK_AUTH_ERROR,
    }
}