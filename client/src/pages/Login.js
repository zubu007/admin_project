import React from 'react'
import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


function Login() {
    const goto = useNavigate()

    const [loginstatus, setLoginStatus] = useState()
    var loginMessage = <h1> </h1>;
    if (loginstatus == 'fail') {
        loginMessage = <h1> password is wrong </h1>;
      } else if(loginstatus == 'unknown') {
        loginMessage = <h1> Email not registered </h1>;
        }

    function handleSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        var value = Object.fromEntries(data)
        const date = new Date()
        value['time'] = date.toLocaleTimeString()
        if (value.email === 'admin@admin.com') {
            if (value.password === 'admin') {
                goto('/dashadm')
            }else {
                setLoginStatus('fail')
            }
        } else {
        sendPost(value)
        }
    }

    const sendPost = async (value) => {
        try {
            const response = await axios.post('http://localhost:3001/users/', value)
            if (response.data.msg === 'success') {
                goto(response.data.role, {state: {user: response.data.user}})
            }else  {
                setLoginStatus(response.data.msg)
                console.log(response.data.msg)
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
                    {loginMessage}
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
