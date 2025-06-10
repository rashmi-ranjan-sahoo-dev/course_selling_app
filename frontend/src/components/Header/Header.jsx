
import logo from "../../assets/transparent_logo.png.png"
import { FaRegSun } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa6";
import { AuthContext } from "../ContextAPI/AuthContext";
import { useContext } from "react";



const Header = () => {

 const {isDark,setIsDark} = useContext(AuthContext)

 function toggleIsDark(){
  setIsDark(!isDark)
 }

  return (
    <nav
     className='h-[15vh] w-screen flex items-center justify-around border-b border-gray-400'>
      <div 
      className='flex justify-center items-center'>
        <img 
        src={logo} 
        alt="SkilHub"
        className='sm:h-25 sm:w-25 md:h-30 md:w-30'
        />
        <div
        className='text-orange-500 md:text-4xl sm:text-2xl -ml-3 font-semibold'>Skill<span className='text-sky-600'>Hub</span></div>
      </div>
      <div className='flex items-center justify-center sm:gap-3 md:gap-6'>
          <a 
          href="/Home"
          className='md:text-3xl sm:text-xl font-mono  hover:border-b transition-all delay-100 duration-100 ease-in-out'>Home</a>
          <a 
          href="/Courses"
          className='md:text-3xl sm:text-xl font-mono  hover:border-b transition-all delay-100 duration-100 ease-in-out'>Courses</a>
          <a 
          href="/Purcheses"
           className='md:text-3xl sm:text-xl font-mono  hover:border-b transition-all delay-100 duration-100 ease-in-out'>Purcheses</a>
          <a  
           href="/ContactUs"
           className='md:text-3xl sm:text-xl font-mono  hover:border-b transition-all delay-100 duration-100 ease-in-out'>CountactUs</a>
      </div>
      <div>
      <div 
      onClick={toggleIsDark}
      className={` border text-sky-400 p-1
      text-2xl rounded-full h-10 w-10 flex items-center justify-center `}
      >
        {isDark ? <FaRegSun/> : <FaRegMoon/>}
      </div>
      </div>
    </nav>
  )
}

export default Header
