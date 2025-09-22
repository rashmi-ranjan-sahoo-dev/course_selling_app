import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='border-t border-gray-500 h-80 bg-transparent px-6 py-10 mt-20 '>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl  mx-auto  my-auto  ">
        <div className='text-center'>
           <span className='font-semibold text-xl text-orange-500 mb-3'>Skill<span className='text-sky-600'>Hub</span></span>
           <p className='text-lg '> Empowering learners worldwide with top-notch online courses and expert-led content.</p>
        </div>
         <div className=' text-center '>
           <h3 className='font-semibold text-lg mb-3'>Quick Links</h3>
          <ul className='space-y-2 text-sm'>
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/courses"  className="hover:underline">Courses</Link></li>
            <li><Link href="#" className="hover:underline">About Us</Link></li>
            <li><Link href="#" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>
         <div >
           <h3 className='text-lg font-semibold mb-3'>Stay Updated</h3>
           <p className='text-sm mb-4'> Subscripbe to our newsletter to get the latest updates</p>
           <form className='flex'>
            <input 
            type="email"
            placeholder='Enter your email'
            className='px-3 py-2 rounded-l bg-gray-800 text-sm text-white placeholder-gray-500 focus:outline-none'
            />
            <button type='submit'
            className='bg-blue-600 hover:bg-blue-700 px-4 py2 rounded-r text-sm font-medium text-white'>Subscribe</button>
           </form>
        </div>
      </div>

      <div className='mt-10 border-t pt-6 text-sm text-center text-gray-500'>
         © {2025} EduPlatform. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
