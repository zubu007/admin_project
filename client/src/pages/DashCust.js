import React from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import DateTime from '../components/DateTime'

function DashCust() {
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div>
            <h1>Dashboard Customer</h1>
            <p>Welcome {location.state.user.name}</p>
            <DateTime/>
            <button onClick={() => navigate('/profile', {state: {user: location.state.user}})}>profile</button>

            <Link to="/">logout</Link>
        </div>
    )
}

export default DashCust
