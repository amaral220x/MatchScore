import React from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'


export default function Register() {
    const [data, setData] = React.useState({
        username: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    
    const registerUser = async (e) => {
        e.preventDefault()
        console.log(e)
        
        const {username, email, password} = data
        try {
            const response = await axios.post('/register', {username, email, password})
            toast.success('User created successfully')
            setData({
                username: '',
                email: '',
                password: ''
            })
            navigate('/login')
        } catch (error) {
            if (error.response) {
                if(error.response.status === 400){
                    if(error.response.data === 'Please fill all fields'){
                        toast.error('Please fill all fields')
                    }
                    if(error.response.data === 'Password must be at least 6 characters long'){
                        toast.error('Password must be at least 6 characters long')
                    }
                    if(error.response.data === 'An account with this email already exists'){
                        toast.error('An account with this email already exists')
                    }
                    if(error.response.data === 'An account with this username already exists'){
                        toast.error('An account with this username already exists')
                    }
                }
            } else {
                console.error(error)
                toast.error('Server error')
            }
        }
    }  
    return (
    <div>
        <form onSubmit={registerUser}>
            <label>username</label>
            <input type="text" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>

            <label>email</label>
            <input type="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>

            <label>password</label>
            <input type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            
            <button type='submit'>register</button>
        </form>
    </div>
    )
}
