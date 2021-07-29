import * as actionTypes from './actionTypes'

const initialState = {
    data: {},
    auth: {
        isLoggedIn: false,
        email: '',
        userId: '',
        formError: false
    }
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        case actionTypes.LOG_IN_SUCCESS: {
            return {
                data: action.tasks,
                auth: {
                    isLoggedIn: true,
                    email: action.email,
                    userId: action.userId,
                    formError: false
                }
            }
        }

        case actionTypes.LOG_IN_ERROR: {
            return {
                data: {},
                auth: {
                    isLoggedIn: false,
                    email: '',
                    userId: '',
                    formError: true
                }
            }
        }

        case actionTypes.SIGN_UP_SUCCESS: {
            return {
                data: {},
                auth: {
                    isLoggedIn: true,
                    email: action.email,
                    userId: action.userId,
                    formError: false
                }
            }
        }

        case actionTypes.SIGN_UP_ERROR: {
            return {
                data: {},
                auth:  {
                    isLoggedIn: false,
                    email: '',
                    userId: '',
                    formError: true
                }
            }
        }

        case actionTypes.LOG_OUT_SUCCESS: {
            return {
                ...state,
                auth: {
                    isLoggedIn: false,
                    email: '',
                    userId: '',
                    formError: false
                }
            }
        }

        case actionTypes.CHECK_AUTH_SUCCESS: {
            return {
                data: action.tasks,
                auth: {
                    isLoggedIn: true,
                    email: action.email,
                    userId: action.userId,
                    formError: false
                }
            }
        }
        case actionTypes.CHECK_AUTH_ERROR: {
            return {
                ...state,
                auth: {
                    userId: '',
                    email: "",
                    isLoggedIn: false,
                    formError: false
                }
            }
        }
        case actionTypes.CHECK_FORM_ERROR:{
            const newAuth = {...state.auth,
                        formError: true
            }
            return {
                ...state,
                auth: newAuth
            }
        }
        case actionTypes.CHECK_FORM_SUCCESS:{
            const newAuth = {...state.auth,
                        formError: false
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
