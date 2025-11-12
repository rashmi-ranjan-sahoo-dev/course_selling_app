import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='border-t border-gray-300 bg-transparant px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 mt-10 sm:mt-16 md:mt-20'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 w-full max-w-7xl mx-auto">
        
        {/* Brand Section */}
        <div className='text-center sm:text-left'>
          <h2 className='font-bold text-xl sm:text-2xl mb-3 sm:mb-4'>
            <span className='text-orange-500'>Skill</span>
            <span className='text-sky-600'>Hub</span>
          </h2>
          <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
            Empowering learners worldwide with top-notch online courses and expert-led content.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className='text-center sm:text-left'>
          <h3 className='font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-gray-500'>Quick Links</h3>
          <ul className='space-y-2 text-sm sm:text-base'>
            <li>
              <Link to="/" className="text-gray-600 hover:text-orange-500 hover:underline transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-gray-600 hover:text-orange-500 hover:underline transition-colors">
                Courses
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-orange-500 hover:underline transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="text-gray-600 hover:text-orange-500 hover:underline transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className='text-center sm:text-left sm:col-span-2 lg:col-span-1'>
          <h3 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-500'>Stay Updated</h3>
          <p className='text-sm sm:text-base text-gray-600 mb-4'>
            Subscribe to our newsletter to get the latest updates
          </p>
          <form className='flex flex-col sm:flex-row gap-2 max-w-md mx-auto sm:mx-0'>
            <input 
              type="email"
              placeholder='Enter your email'
              className='flex-1 px-4 py-2 sm:py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white border border-gray-300 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
            <button 
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-r-lg sm:rounded-l-none text-sm sm:text-base font-medium text-white transition-colors shadow-md hover:shadow-lg'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className='mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-300 text-xs sm:text-sm text-center text-gray-500'>
        © {new Date().getFullYear()} SkillHub. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer