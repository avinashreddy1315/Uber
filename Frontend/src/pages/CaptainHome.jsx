import React, { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'

const CaptainHome = () => {
    const { captain } = useContext(CaptainDataContext)

    useState(() =>{
      console.log(captain)
    }, [])
  return (
    <div>
      <h2>It is captain's Home</h2>
      <p>{captain.email}</p>
     
    
    </div>
  )
}

export default CaptainHome
