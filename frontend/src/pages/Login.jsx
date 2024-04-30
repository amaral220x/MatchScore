import React from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'; // Importe useContext
import { UserContext } from '../../context/userContext'; // Importe UserContext

export default function Login() {
    const [data, setData] = React.useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    //const history = useHistory()
    const {setUser} = useContext(UserContext) 

    const loginUser = async (e) => {
        e.preventDefault()
        console.log(e)
        const {username, password} = data
        try {
            const response = await axios.post('/login', {username, password})
            setUser(response.data.user)
            toast.success('Login successful')
            setData({
                username: '',
                password: ''
            })
            window.location.href = '/dashboard'
            //history.push('/dashboard')
            //navigate('/dashboard')

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data === 'Please fill all fields') {
                        toast.error('Please fill all fields')
                    }
                    if (error.response.data === 'Invalid credentials') {
                        toast.error('Invalid credentials')
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
        <form onSubmit={loginUser}>
            <label>username</label>
            <input type="text" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
    
            <label>password</label>
            <input type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            
            <button type='submit'>login</button>
        </form>
    </div>
  )
}
