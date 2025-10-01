import React from 'react'
import { Link } from 'react-router-dom'

const Auth = () => {
  return (
    <div className='absolute right-0 top-12 sm:top-14 md:top-16 w-40 sm:w-44 md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn'>
      <Link 
        to="/user/signup" 
        className='block px-4 py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-orange-500 hover:text-white transition-colors duration-200 border-b border-gray-200 text-center'
      >
        Sign Up
      </Link>
      <Link 
        to="/user/signin" 
        className='block px-4 py-3 text-sm sm:text-base font-medium text-gray-700 hover:bg-sky-500 hover:text-white transition-colors duration-200 text-center'
      >
        Sign In
      </Link>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Auth