import React from 'react'
import {Link} from 'react-router-dom'
import logo from "../../assets/skilHub-logo.png.png"


const Header = () => {
  return (
    <nav
     className='h-[15vh] w-screen flex items-center justify-around border border-gray-400'>
      <div>
        <img 
        src={logo} 
        alt="SkilHub"
        className='h-30 w-30'
        />
      </div>
      <div className='flex items-center justify-center sm:gap-2 md:gap-6'>
          <a 
          href="/Home"
          className='md:text-3xl sm:text-xl font-mono  hover:border-b transition-all delay-100 duration-100 ease-in-out'>Home</a>
          <a 
          href="/Courses"
          className='md:text-3xl sm:text-xl font-mono  hover:border-b transition-all delay-100 duration-100 ease-in-out'>Courses</a>
          <a 
          href="/Purcheses"
          className='tmd:text-3xl sm:text-xl font-mono  hover:border-b transition-all delay-100 duration-100 ease-in-out'>Purcheses</a>
          <a 
          href="/CountactUs"
          className='md:text-3xl sm:text-xlgit font-mono  hover:border-b transition-all delay-100 duration-100 ease-in-out'>CountactUs</a>
      </div>
      <div>Authentication</div>
    </nav>
  )
}

export default Header
