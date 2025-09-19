import React from 'react'

const Footer = () => {
  return (
    <div className='border-t border-gray-500 h-80 '>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-6xl h-fit mx-auto  my-auto  ">
        <div className='h-40 w-50 border text-center'>
           <h3>ABOUT US</h3>
           <p className='text-sm '> Empowering learners worldwide with top-notch online courses and expert-led content.</p>
        </div>
         <div className='h-40 w-50 border text-center '>
           <h3>ABOUT US</h3>
           <p className='text-sm'> Empowering learners worldwide with top-notch online courses and expert-led content.</p>
        </div>
         <div className='h-40 w-fit border text-center'>
           <h3>ABOUT US</h3>
           <p className='text-sm'> Empowering learners worldwide with top-notch online courses and expert-led content.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
