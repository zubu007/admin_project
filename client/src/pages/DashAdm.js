import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function DashAdm() {
    return (
        <div>
            <h1>Dashboard for Admin</h1>
            <Link to="/">logout</Link>
        </div>
    )
}

export default DashAdm
