import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profile() {
    const location = useLocation()
    const navigate = useNavigate()
    const value = location.state.user

    const handleEdit = () => {
        navigate('/editprofile', { state: { user: value } })
    }

    const handleDelete = () => {
        sendPost(value)
    }

    const sendPost = async (value) => {
        try {
            const response = await axios.post('http://localhost:3001/deletecustomer/', value)
            if (response.data.msg == true) {
                console.log('deleted')
                navigate('/')
            }
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Name: {location.state.user.name}</p>
            <p>Email: {location.state.user.email}</p>
            <p>Phone: {location.state.user.phone}</p>
            <p>Details: {location.state.user.details}</p>
            <button onClick={() => navigate('/dashcust', {state: {user: location.state.user}})}>back</button>
            <Link to='/'>
            <button>log out</button>
            </Link>
            <button onClick={handleEdit}>edit</button>
            <button onClick= {handleDelete}>Delete</button>
        </div>
    )
}

export default Profile
