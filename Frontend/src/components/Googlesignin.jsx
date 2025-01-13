import React from 'react'
import Google from '../../public/google.png'

const Googlesignin = () => {
  return (
    <div className='flex flex-col items-center gap-4 justify-center'>
        <div className='flex flex-row justify-center items-center gap-1'>
          <div className='bg-gray-400 w-16 h-1'></div>
          <p>Other sign-in methods</p>
          <div  className='bg-gray-400 w-16 h-1'></div>
        </div>
        <div className='google-login button'>
          <button >
            <img className='w-10' src={Google} alt='login with Google' />
          </button>
        </div>
      </div>
  )
}

export default Googlesignin
