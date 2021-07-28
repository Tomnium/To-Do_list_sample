import React, { useState } from 'react'
import './ListItem.css'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'

export const ListItem = React.memo((props) => {
    const [newName, setNewName] = useState(props.text)

    const dispatch = useDispatch()

    const handleRename = () => {
        dispatch(actions.renameItemStart(props.serverId, newName))
    }

    const handleDelete = () => {
        dispatch(actions.deleteItemStart(props.serverId))
    }

    return (
        <div className="list-item">
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <div>
                <CreateIcon className="list-item-icon rename" onClick={handleRename} />
                <DeleteIcon className="list-item-icon delete" onClick={handleDelete} />
            </div>
        </div>
    )
})