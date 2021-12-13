import {React, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditProfile() {
    const location = useLocation()
    const navigate = useNavigate()
    const employee = location.state.employee
    var customer = location.state.customer

    var loginMessage = <h1></h1>
    const [loginstatus, setLoginStatus] = useState()
    if (loginstatus == 'success') {
        loginMessage = <h1> changed Successfully </h1>;
      } else if(loginstatus == 'unknown') {
        loginMessage = <h1> Email not registered </h1>;
        }


    function handleSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const value = Object.fromEntries(data)
        customer.name = value.name
        customer.phone = value.phone
        customer.details = value.details
        console.log(value)  
        sendPost(customer)
    }

    const sendPost = async (value) => {
        try {
            const response = await axios.post('http://localhost:3001/edituser/', value)
            setLoginStatus(response.data.msg)
            console.log(response)
        }catch(err) {
            console.log(err)
        }
    }

    const handleBack = () => {
        if (employee.email == 'admin@admin.com') {
            navigate('/dashadm')
        }else{
            navigate('/dashEmp', {state: {user: employee}})
        }
    }

    return (
        <div>
            <h1>Edit profile</h1>
            <h2>hello {customer.name}</h2>
            <div className='editform'>
            <form onSubmit={handleSubmit}>
                <label>
                    Name 
                    <input type="text" name="name" className="form-control" defaultValue={customer.name} required />
                </label>
                <label>
                    Phone 
                    <input type="text" name="phone" className="form-control" defaultValue={customer.phone} required/>
                </label>
                <label>
                    Details
                    <textarea className="form-control" name="details" defaultValue={customer.details} required/>
                </label>
                
                {loginMessage}
                    <button className="btn btn-primary" type="submit">Done</button>
                </form>
                <button onClick={handleBack}>Back</button>
            </div>
        </div>
    )
}

export default EditProfile
