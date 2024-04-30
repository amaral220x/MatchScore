import React from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import '../styles/Navbar.css'

export default function Navbar() {
  const {user} = useContext(UserContext)

  const logout = async () => {
    try {
      await axios.get('/logout')
      window.location.href = '/'
    } catch (error) {
      console.error(error)
    }
  }
  if (user) {
    return (
      <nav className= "nav-user">
        <ul className='nav-user-list-ul'>        
          <li className='nav-user-list-li'>
            <Link to='/'>Home</Link>
          </li>
          <li className='nav-user-list-li'>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li className='nav-user-list-logout'>
            <Link to='/logout' onClick={logout}>Logout</Link>
          </li>
        </ul>
      </nav>
    )
  }
  return (
    <nav className= "nav-default">
      <ul className='nav-user-list-ul'>
        <li className='nav-user-list-li'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-user-list-li'>
          <Link to='/login'>Login</Link>
        </li>
        <li className='nav-user-list-li'>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  )
}
