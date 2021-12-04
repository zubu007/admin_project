import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


function Login() {
    const goto = useNavigate()
    const [path, setPath] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const value = Object.fromEntries(data)
        console.log(value)  
        if (value.email === 'admin@admin.com') {
            if (value.password === 'admin') {
                goto('/dashadm')
            }else {
                console.log('password is wrong')
            }
        } else {
        sendPost(value)
        }
    }

    const sendPost = async (value) => {
        try {
            const response = await axios.post('http://localhost:3001/users/', value)
            if (response.data.msg === 'success') {
                setPath(response.data.role)
                goto(response.data.role)
                console.log(path)
            }else if (response.data.msg === 'fail') {
                console.log('password is wrong')
            }else if (response.data.msg === 'unknown'){
                console.log('user not found')
            }
            console.log(response)
        }catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <div className="form-group">
                <form onSubmit={handleSubmit}>
                    <label>
                        Email address:
                        <input type="email" name="email" className="form-email" placeholder="Enter email" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" className="form-password" placeholder="Enter password" />
                    </label>
                    <button type="submit" className="btn btn-primary">Log in</button>
                </form>
                <Link to="/register">
                <button className="btn btn-secondary">Sign up</button>
                </Link>
            </div>
        </div>
    )
}

export default Login
