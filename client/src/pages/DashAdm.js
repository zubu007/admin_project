import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import DateTime from '../components/DateTime'

function DashAdm() {
    return (
        <div>
            <h1>Dashboard for Admin</h1>
            <DateTime/>
            <Link to="/">logout</Link>
        </div>
    )
}

export default DashAdm
