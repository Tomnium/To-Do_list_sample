import * as actionTypes from './actionTypes'

const initialState = {
    data: {},
    auth: {
        isLoggedIn: false,
        email: '',
        userId: ''
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
                    userId: action.userId
                }
            }
        }

        case actionTypes.LOG_IN_ERROR: {
            return {
                ...state,
                auth: {
                    isLoggedIn: false,
                    email: '',
                    userId: ''
                }
            }
        }

        case actionTypes.SIGN_UP_SUCCESS: {
            return {
                ...state,
                auth: {
                    isLoggedIn: true,
                    email: action.email,
                    userId: action.userId
                }
            }
        }

        case actionTypes.SIGN_UP_ERROR: {
            return {
                ...state,
                auth:  {
                    isLoggedIn: false,
                    email: '',
                    userId: ''
                }
            }
        }

        case actionTypes.LOG_OUT_SUCCESS: {
            return {
                ...state,
                auth: {
                    isLoggedIn: false,
                    email: '',
                    userId: ''
                }
            }
        }

        case actionTypes.CHECK_AUTH_SUCCESS: {
            return {
                data: action.tasks,
                auth: {
                    isLoggedIn: true,
                    email: action.email,
                    userId: action.userId
                }
            }
        }
        case actionTypes.CHECK_AUTH_ERROR: {
            return {
                ...state,
                auth: {
                    userId: '',
                    email: "",
                    isLoggedIn: false
                }
            }
        }
        default:
            return state
    }
}
