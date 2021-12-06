import React from 'react'
import { useLocation } from 'react-router-dom'

function EditProfile() {
    const location = useLocation()

    return (
        <div>
            <h1>Edit profile</h1>
            <h2>hello {location.state.user.name}</h2>
        </div>
    )
}

export default EditProfile
