import axios from '../axios'
import * as actionTypes from './actionTypes'

export const setData = (data) => {
    return {
        type: actionTypes.SET_DATA,
        data
    }
}

export const loadData = () => {
    return (dispatch) => {
        axios.get('/list')
            .then(response => {
                const data = Object.keys(response.data).map(key => { return { id: key, text: response.data[key].name } })
                console.log(data)
                dispatch(setData(data))
            })
            .catch(console.log)
    }
}

export const deleteById = (id) => {
    return (dispatch) => {
        axios.delete(`/item/${id}`)
            .then(() => dispatch(loadData()))
    }
}

export const rename = (id, newText) => {
    return (dispatch) => {
        axios.put(`/item/${id}`, { name: newText })
            .then(() => dispatch(loadData()))
    }
}

export const add = (text) => {
    return (dispatch) => {
        axios.post(`/item`, { name: text })
            .then(() => dispatch(loadData()))
    }
}