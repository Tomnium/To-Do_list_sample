import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ListItem } from './ListItem'
import * as actions from '../redux/actions'

export const List = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    const [text, setText] = useState('')

    useEffect(() => {
        dispatch(actions.dataLoadStart())
    }, [dispatch])

    const handleAdd = () => {
        dispatch(actions.addItemStart(text))
    }

    const handleTextChange = e => {
        setText(e.target.value)
    }

    return (
        <div className="list">
            { Object.keys(data).length !== 0 ?
                Object.keys(data).map(item => <ListItem key = { `${ item }` } text = { data[item] } serverId={ item } />) :
                <div>No items</div>}
            <div className="add-new">
                <form className="item-form new-item-form" onSubmit={handleAdd}>
                    <input type="text" value={text} onChange={handleTextChange} />
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}