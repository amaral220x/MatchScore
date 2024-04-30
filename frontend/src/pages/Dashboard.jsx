import React from 'react'
import {useContext} from 'react'
import { UserContext } from '../../context/userContext'
import '../styles/Dashboard.css'

export default function Dashboard() {
    const {user} = useContext(UserContext);

  return (
    //If the user is logged in, display the dashboard page with a welcome message
    //conditional rendering
    <div className='main-div'>
        <h1>Dashboard</h1>
        {user ? <h2>Welcome, {user.username}</h2> : <></>}

    </div>
  )
}
