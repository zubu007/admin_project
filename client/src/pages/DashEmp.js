import React from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useState, useEffect} from 'react'
import DateTime from '../components/DateTime'
import axios from 'axios'
import CustomerRow from '../components/CustomerRow'

function DashEmp() {
    const location = useLocation()
    const navigate = useNavigate()
    
    const [customerlist, setCustomerlist] = useState({})

    useEffect(() => {
        const interval = setInterval(() => {
            async function fetchData() {
                const response = await axios.get('http://localhost:3001/customerlist')
                console.log(response.data)
                setCustomerlist(response.data)
    
            } fetchData()
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    const handleClick = (e) => {
        const time = new Date()
        var value = {time : time.toLocaleTimeString()}
        value['email'] = location.state.user.email
        sendPost(value)
        navigate('/')
    }

    const sendPost = async (value) => {
        const response = await axios.post('http://localhost:3001/logout', value)
        console.log(response)
    }

    return (
        <div>
            <h1>Dashboard Employer</h1>
            <p>Welcome {location.state.user.name}</p>
            <p>Total Customer: {Object.keys(customerlist).length}</p>
            <DateTime/>
            {Object.keys(customerlist).map(key => {
                return <CustomerRow customer={customerlist[key]} employee = {location.state.user}/>

            })}
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default DashEmp
