import Axios from '../axios'
import * as actionTypes from './actionTypes'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export const dataLoadStart = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DATA_LOAD_START })
            const response = await Axios.get(`/tasks/list?userId=${userId}`)
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
    toast.success("Add item success", {
        position: "top-center",
        autoClose:2000,
    })
    return {
        type: actionTypes.ADD_ITEM_SUCCESS,
        data
    }
}

const addItemError = () => {
    toast.error("Add item error", {
        position: "top-center",
        autoClose:2000,
    })
    return {
        type: actionTypes.ADD_ITEM_ERROR
    }
}

export const renameItemStart = (taskId, newText, userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.RENAME_ITEM_START })
            const params = JSON.stringify({userId, taskId})

            const response = await Axios.put(`/tasks/item?userId=${userId}&taskId=${taskId}`, { text: newText })
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
    toast.success("rename item success", {
        position: "top-center",
        autoClose:2000,
    })
    return {
        type: actionTypes.RENAME_ITEM_SUCCESS,
        data
    }
}

const renameItemError = () => {
    toast.error("rename item error", {
        position: "top-center",
        autoClose:2000,
    })
    return {
        type: actionTypes.RENAME_ITEM_ERROR
    }
}

export const deleteItemStart = (taskId, userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.DELETE_ITEM_START })

            const response = await Axios.delete(`/tasks/item?userId=${userId}&taskId=${taskId}`)
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
    toast.success("delete item success", {
        position: "top-center",
        autoClose:2000,
    })
    return {
        type: actionTypes.DELETE_ITEM_SUCCESS,
        data
    }
}

const deleteItemError = () => {
    toast.error("delete item error", {
        position: "top-center",
        autoClose:2000,
    })
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
        } catch(error) {
            dispatch(signUpError())
            throw error
        }
    }
}

const signUpSuccess = (response) => {
    const { user, accessToken } = response.data;
    localStorage.setItem('token', accessToken)
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
            const response = await Axios.post('/auth/log-in', { email, password })
            dispatch(response.status < 400 ?
                logInSuccess(response) :
                logInError()
            )
        } catch(error) {
            dispatch(logInError())
            throw error
        }
    }
}

const logInSuccess = (response) => {
    const { user, accessToken, tasks} = response.data;
    localStorage.setItem('token', accessToken)
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