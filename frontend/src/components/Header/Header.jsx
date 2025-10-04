import { useState, useContext } from "react";
import logo from "../../assets/transparent_logo.png.png"
import { FaRegSun, FaRegMoon } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { AuthContext } from "../ContextAPI/AuthContext";
import Auth from "../Auth/Auth";
import Logout from "../Logout/Logout";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../ContextAPI/AuthContext";
;
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, setIsDark, isActive, setIsActive, isLoggedIn, role } = useContext(AuthContext);

 

  function toggleIsDark() {
    if(isDark !== "dark"){
      setIsDark("dark");
      localStorage.setItem("theme",isDark);
    }else{
      setIsDark("light")
    }
  }

  

  function toggleIsActive() {
    setIsActive(!isActive);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  // console.log(isActive);
  // console.log(isLoggedIn);

  return (
    <nav className='h-16 sm:h-20 md:h-24 w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 border-b border-gray-300  relative'>
      
      {/* Logo Section */}
      <div className='flex items-center gap-1 sm:gap-2 flex-shrink-0'>
        <img 
          src={logo} 
          alt="SkillHub"
          className='h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 object-contain'
        />
        <div className='text-orange-500 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold whitespace-nowrap'>
          Skill<span className='text-sky-600'>Hub</span>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <div className='hidden lg:flex items-center gap-4 xl:gap-8'>
        <Link 
          to="/"
          className='text-lg xl:text-xl font-mono text-gray-400 hover:text-orange-500 hover:border-b-2 hover:border-orange-500 transition-all duration-200 pb-1'
        >
          Home
        </Link>
        <Link 
          to="/courses"
          className='text-lg xl:text-xl font-mono text-gray-400 hover:text-orange-500 hover:border-b-2 hover:border-orange-500 transition-all duration-200 pb-1'
        >
          Courses
        </Link>
        <Link 
          to="/purchases"
          className='text-lg xl:text-xl font-mono text-gray-400 hover:text-orange-500 hover:border-b-2 hover:border-orange-500 transition-all duration-200 pb-1'
        >
          Purchases
        </Link>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={toggleIsDark}
          className='border border-sky-400 text-sky-400 hover:bg-sky-50 p-2 text-xl sm:text-2xl rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer transition-all'
          aria-label="Toggle theme"
        >
          {isDark ? <FaRegSun/> : <FaRegMoon/>}
        </button>

        {/* Account Menu Toggle */}
        <div className="relative">
          <button 
            onClick={toggleIsActive}
            className='border border-sky-400 text-sky-400 hover:bg-sky-50 p-2 text-xl sm:text-2xl rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer transition-all'
            aria-label="Account menu"
          >
            <MdManageAccounts/>
          </button>
          
          {/* Account Dropdown */}
          {isLoggedIn ? (isActive && <Logout role={role}/>) : (isActive && <Auth/>)}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={toggleMobileMenu}
          className='lg:hidden border border-gray-400 text-gray-700 hover:bg-gray-50 p-2 text-xl sm:text-2xl rounded-full h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer transition-all'
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX/> : <HiMenuAlt3/>}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className='lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-300 shadow-lg z-50'>
          <div className='flex flex-col py-4 px-6 space-y-4'>
            <a 
              href="/"
              onClick={toggleMobileMenu}
              className='text-lg font-mono text-gray-700 hover:text-orange-500 hover:pl-2 transition-all duration-200'
            >
              Home
            </a>
            <a 
              href="/courses"
              onClick={toggleMobileMenu}
              className='text-lg font-mono text-gray-700 hover:text-orange-500 hover:pl-2 transition-all duration-200'
            >
              Courses
            </a>
            <a 
              href="/purchases"
              onClick={toggleMobileMenu}
              className='text-lg font-mono text-gray-700 hover:text-orange-500 hover:pl-2 transition-all duration-200'
            >
              Purchases
            </a>
          </div>
        </div>
      )}

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className='lg:hidden fixed inset-0 bg-black bg-opacity-25 z-40'
          onClick={toggleMobileMenu}
        />
      )}
    </nav>
  )
}

export default Header