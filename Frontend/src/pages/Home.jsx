import React, { useState } from 'react'
import { UserDataContext } from '../context/UserContext'

const Home = () => {

  const {user} = React.useContext(UserDataContext);
  useState(() =>{
    console.log(user);
  }, [])

  return (
    <div>
      <h2>Welcome to home</h2>
      <h1>{user.email}</h1>
    </div>
  )
}

export default Home
