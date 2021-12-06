import React from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function CustomerRow(props) {
    const navigate = useNavigate()
    console.log(props)
    const handleArchive = () => {
        const user = props.customer
        sendPost(user) }

    const handleEdit = () => {
        navigate('/editprofile', {state: {user: props.customer}})
    }

    const sendPost = async (user) => {
        const response = await axios.post('http://localhost:3001/archive', user)
        console.log(response.data.msg)
    }

    return (
        <div>
            <p>{props.customer.name}</p>
            <p>{props.customer.email}</p>
            <p> Archived: {props.customer.archived ? 'Yes' : 'No'}</p>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleArchive}>Archive</button>
        </div>
    )
}

export default CustomerRow
