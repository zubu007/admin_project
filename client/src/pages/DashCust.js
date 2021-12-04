import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function DashCust() {
    return (
        <div>
            <h1>Dashboard Customer</h1>
            <Link to="/">logout</Link>
        </div>
    )
}

export default DashCust
