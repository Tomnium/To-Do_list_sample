import axios from '../axios'
import * as actionTypes from './actionTypes'

export const dataLoadStart = () => {
    return (dispatch) => {
        axios.get('/list')
            .then(response => dispatch(response.status < 400 ? dataLoadSuccess(response.data) : dataLoadError()))
            .catch(() => dispatch(dataLoadError()))
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

export const addItemStart = (item) => {
    return (dispatch) => {
        axios.post(`/item`, { text: item })
            .then(response => dispatch(response.status < 400 ? addItemSuccess(response.data) : addItemError()))
            .catch(() => dispatch(addItemError()))
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

export const renameItemStart = (id, newText) => {
    return (dispatch) => {
        axios.put(`/item/${ id }`, { text: newText })
            .then(response => dispatch(response.status < 400 ? renameItemSuccess(response.data) : renameItemError()))
            .catch(() => dispatch(renameItemError()))
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

export const deleteItemStart = (id) => {
    return (dispatch) => {
        axios.delete(`/item/${ id }`)
            .then(response => dispatch(response.status < 300 ? deleteItemSuccess(response.data) : deleteItemError()))
            .catch(() => dispatch(deleteItemError()))
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