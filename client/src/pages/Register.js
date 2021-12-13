import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [loginstatus, setLoginStatus] = useState()
    const navigate = useNavigate()
    var loginMessage = <h1> </h1>;
    if (loginstatus == 'success') {
        loginMessage = <h1> User Successfully added </h1>;
      } else if (loginstatus == 'failure') {
        loginMessage = <h1> User already available </h1>;
      } else if(loginstatus == 'empty'){
        loginMessage = <h1> Email is required </h1>;
        }

    function handleSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const value = Object.fromEntries(data)
        console.log(value)  
        sendPost(value)
        // navigate('/')
    }

    const sendPost = async (value) => {
        try {
            const response = await axios.post('http://localhost:3001/adduser/', value)
            setLoginStatus(response.data.msg)
            console.log(response)
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <div className="form-group">
                <form onSubmit={handleSubmit}>
                <label>
                    Name 
                    <input type="text" name="name" className="form-control" />
                </label>
                <label>
                    Email
                    <input type="email" name="email" className="form-control" />
                </label>
                <label>
                    Phone 
                    <input type="text" name="phone" className="form-control" />
                </label>
                <label>
                    Password
                    <input type="password" name="password" className="form-control" />
                </label>
                <label>
                    Details
                    <textarea className="form-control" name="details"/>
                </label>
                <label>
                    Roles
                    <select className="form-control" name="roles">
                        <option>Customer</option>
                        <option>Employer</option>
                    </select>
                </label>
                {loginMessage}
                    <button className="btn btn-primary" type="submit">Register</button>
                </form>
                <Link to="/">
                <button className="btn btn-secondary">back</button>
                </Link>
            </div>
        </div>
    )
}

export default Register
