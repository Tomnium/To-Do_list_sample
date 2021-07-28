import React, { useState, useEffect } from 'react'
import './List.css'
import { useSelector, useDispatch } from 'react-redux'
import { ListItem } from '../'
import * as actions from '../../redux/actions'
import AddCircleIcon from '@material-ui/icons/AddCircle'

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
            {Object.keys(data).length ?
                Object.keys(data).map(item => <ListItem key={`${item}`} text={data[item]} serverId={item} />) :
                <div className="no-items">No items</div>}
            <div className="add-new">
                <form className="item-form new-item-form">
                    <input type="text" value={text} onChange={handleTextChange} autoFocus />
                    <AddCircleIcon className="submit-icon" onClick={handleAdd} />
                </form>
            </div>
        </div>
    )
}