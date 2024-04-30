import React from 'react'
import { UserContext } from '../../context/userContext'
import {useContext} from 'react'

export default function Home() {
  const {user} = useContext(UserContext)

  if (user) {
    return (
      <div>
        Home {user.username}
      </div>
    )
  }
  return (
    <div>
      Home
    </div>
  )
}
