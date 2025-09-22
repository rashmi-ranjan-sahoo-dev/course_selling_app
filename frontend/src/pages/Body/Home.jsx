import React from 'react'
import img1 from "../../assets/img-1.jpeg"
import img2 from "../../assets/img-2.jpeg"
import img3 from "../../assets/img-3.jpeg"

const Home = () => {
  return (
    <div 
    className='w-full h-full flex flex-col justify-center items-center p-20'>
      <div
      className='h-30 w-200 text-center '
      >
        <span 
        className='text-orange-600 text-5xl font-extrabold'>SkillHub:</span><span  className=' text-5xl font-extrabold'>The Ultimate Platform to Share Knowledge</span>
      </div>
      <div
      className='text-xl m-2'>A beginner-friendly platform for mastering programming skills.
      </div>
      <div className='m-2'>
        <button
        className='w-fit h-fit bg-orange-500 hover:bg-orange-600 transition-all duration-400 hover:p-4 p-3 text-xl hover:text-2xl rounded-2xl cursor-pointer'>Explore Courses</button>
      </div>
      {/* Sccrollngf images section */}
      <div
      className='overflow-hidden w-full mt-10'>
        
         <div className='flex whitespace-nowrap animate-[scroll_20s_linear_infinite]'>
            <img src={img1} alt=""className='w-70 h-60 mx-4'/>
            <img src={img2} alt=""className='w-70 h-60 mx-4' />
            <img src={img3} alt=""className='w-70 h-60 mx-4' />
            <img src={img1} alt=""className='w-70 h-60 mx-4' />
            <img src={img2} alt=""className='w-70 h-60 mx-4' />
            <img src={img3} alt=""className='w-70 h-60 mx-4' />
         </div>
      </div>
       <style>{`
        @keyframes scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}

export default Home
