import * as actionTypes from './actionTypes'

const initialState = {
    data: {},
    auth: {
        isLoggedIn: localStorage.getItem('token') !== '',
        loggedInUser: localStorage.getItem('loggedInUserEmail'),
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
        case actionTypes.LOG_IN_SUCCESS:
            return {
                ...state,
                auth: {
                    isLoggedIn: true,
                    loggedInUser: action.email
                }
            }
        case actionTypes.LOG_IN_ERROR:
            return {
                ...state,
                auth: {
                    isLoggedIn: false,
                    loggedInUser: ''
                }
            }
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                auth: {
                    isLoggedIn: true,
                    loggedInUser: action.email
                }
            }
        case actionTypes.SIGN_UP_ERROR:
            return {
                ...state,
                auth: {
                    isLoggedIn: false,
                    loggedInUser: ''
                }
            }
        case actionTypes.LOG_OUT_SUCCESS:
            return {
                ...state,
                auth: {
                    isLoggedIn: false,
                    loggedInUser: ''
                }
            }
        default:
            return state
    }
}
