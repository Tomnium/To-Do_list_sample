import * as actionTypes from './actionTypes'

const initialState = {
    data: {},
    auth: {
        isLoggedIn: false,
        loggedInUser: ''
    }
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.ADD_ITEM_ERROR:
            return state
        case actionTypes.DATA_LOAD_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.DATA_LOAD_ERROR:
            return state
        case actionTypes.RENAME_ITEM_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.RENAME_ITEM_ERROR:
            return state
        case actionTypes.DELETE_ITEM_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case actionTypes.DELETE_ITEM_ERROR:
            return state
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
                    isLoggedIn: false
                }
            }
        default:
            return state
    }
}