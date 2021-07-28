import * as actionTypes from './actionTypes'

const initialState = {
    data: {},
    auth: {
        isLoggedIn: localStorage.getItem('token') !== '',
        loggedInUser: localStorage.getItem('loggedInUserEmail'),
        userId: null
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.DATA_LOAD_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.RENAME_ITEM_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.LOG_IN_SUCCESS:{
            const newAuth = {...state.auth,
                isLoggedIn: true,
                loggedInUser: action.email
            }
            return {
            ...state,
                auth: newAuth
            }
        }

        case actionTypes.LOG_IN_ERROR:{
            const newAuth = {...state.auth,
                isLoggedIn: false,
                loggedInUser: ''
            }
            return {
                ...state,
                auth: newAuth
            }
        }

        case actionTypes.SIGN_UP_SUCCESS:{
            const newAuth = {...state.auth,
                isLoggedIn: true,
                loggedInUser: action.email
            }
            return {
                ...state,
                auth: newAuth
            }
        }

        case actionTypes.SIGN_UP_ERROR:{
            const newAuth = {...state.auth,
                isLoggedIn: false,
                loggedInUser: ''
            }
            return {
                ...state,
                auth: newAuth
            }
        }

        case actionTypes.LOG_OUT_SUCCESS:{
            const newAuth = {...state.auth,
                isLoggedIn: false,
                loggedInUser: ''
            }
            return {
                ...state,
                auth: newAuth
            }
        }

        case actionTypes.CHECK_AUTH_SUCCESS:{
            const newAuth = {...state.auth,
                userId: action.id,
                loggedInUser: action.email
            }
            return {
                ...state,
                auth: newAuth
            }
        }

        default:
            return state
    }
}
