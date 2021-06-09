import * as actionTypes from './actionTypes'

const initialState = {
    data: {}
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_ITEM_SUCCESS:
            return {
                data: action.data
            }
        case actionTypes.ADD_ITEM_ERROR:
            return state
        case actionTypes.DATA_LOAD_SUCCESS:
            return {
                data: action.data
            }
        case actionTypes.DATA_LOAD_ERROR:
            return state
        case actionTypes.RENAME_ITEM_SUCCESS:
            return {
                data: action.data
            }
        case actionTypes.RENAME_ITEM_ERROR:
            return state
        case actionTypes.DELETE_ITEM_SUCCESS:
            return {
                data: action.data
            }
        case actionTypes.DELETE_ITEM_ERROR:
            return state
        default:
            return state
    }
}