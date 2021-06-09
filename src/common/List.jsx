import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ListItem } from './ListItem'
import * as actions from '../store/actions'

export const List = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    const [text, setText] = useState('')

    useEffect(() => {
        dispatch(actions.loadData())
    }, [])

    const handleAdd = () => {
        if (text)
            dispatch(actions.add(text))
    }

    const handleTextChange = e => {
        setText(e.target.value)
    }

    return (
        <div className="list">
            { data.length !== 0 ?
                data.map(elem => <ListItem key={`${elem.id}`} text={elem.text} serverId={elem.id} />) :
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