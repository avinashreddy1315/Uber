import React from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useContext } from 'react'

const CaptainHome = () => {
    const { captain } = useContext(CaptainDataContext)
  return (
    <div>
      <h2>It is captain's Home</h2>
     <p>{captain ? captain.email : ''}</p>
    </div>
  )
}

export default CaptainHome
