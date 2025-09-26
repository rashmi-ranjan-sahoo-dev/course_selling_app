import React from 'react'
import { Link } from 'react-router'

const Auth = () => {
  return (
    <div className='w-fit h-fit border flex flex-col relative top-18'>
       <Link to = "/user/signup" className='border-b p-2 font-serif hover:bg-blue-400 hover:text-black'>signup</Link>
       <Link to = "/user/signin" className='p-2 font-serif hover:bg-blue-400 hover:text-black'>signin</Link>
    </div>
  )
}

export default Auth
