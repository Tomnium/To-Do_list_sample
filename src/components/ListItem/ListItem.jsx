import React, { useState } from 'react'
import './ListItem.css'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'

export const ListItem = (props) => {
    const [newName, setNewName] = useState(props.text)

    const dispatch = useDispatch()

    const handleRename = () => {
        dispatch(actions.renameItemStart(props.serverId, newName))
    }

    const handleDelete = () => {
        dispatch(actions.deleteItemStart(props.serverId))
    }

    return (
        <div className = "list-item">
            <input type = "text" value = { newName } onChange = { (e) => setNewName(e.target.value) } />
            <div>
                <button onClick = { handleRename }>Change</button>
                <button onClick = { handleDelete }>Delete</button>
            </div>
        </div>
    )
}