import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../ContextAPI/AuthContext'

const Auth = () => {
  const {setIsLoggedIn ,setIsActive} = useContext(AuthContext)
 
  function toggleIsLoggedIn(){
    setIsLoggedIn(false)
    setIsActive(true)
      }

  return (
    <div
    className='w-fit h-fit border border-black relative top-16 '
    > 
      <div
      onClick={toggleIsLoggedIn}
      className='bg-blue-300 hover:bg-blue-600 text-gray-900 w-full h-full transition-all duration-400 p-1 border-b cursor-pointer font-mono'
       ><Link to='/signup'>signup</Link></div>
      <div
      onClick={toggleIsLoggedIn}
      className='bg-blue-300 hover:bg-blue-600 text-gray-900 w-full h-full transition-all duration-400 p-1 cursor-pointer font-mono'
      ><Link to='/signin'>signin</Link></div>
    </div>
  )
}

export default Auth
