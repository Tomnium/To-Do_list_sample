import * as actionTypes from './actionTypes'

const initialState = {
    data: []
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_DATA:
            return {
                data: action.data
            }
        default:
            return state
    }
}