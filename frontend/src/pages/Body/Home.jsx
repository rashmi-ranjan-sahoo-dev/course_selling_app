import React from 'react'
import img1 from "../../assets/img-1.jpeg"
import img2 from "../../assets/img-2.jpeg"
import img3 from "../../assets/img-3.jpeg"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div 
    className='w-full min-h-screen flex flex-col justify-center items-center px-4 py-8 sm:px-8 md:px-12 lg:px-20'>
      {/* Hero Text Section */}
      <div
      className='max-w-5xl text-center mb-4 sm:mb-6'
      >
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight'>
          <span className='text-orange-600'>SkillHub: </span>
          <span >The Ultimate Platform to Share Knowledge</span>
        </h1>
      </div>

      {/* Subtitle */}
      <div
      className='text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 text-center mb-4 sm:mb-6 max-w-3xl px-4'>
        A beginner-friendly platform for mastering programming skills.
      </div>

      {/* CTA Button */}
      <div className='mb-8 sm:mb-12'>
        <button
        className='bg-orange-500 hover:bg-orange-600 transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl md:text-2xl font-semibold text-white rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105'
        onClick={() => navigate("/courses")}>
          Explore Courses
        </button>
      </div>

      {/* Scrolling Images Section */}
      <div
      className='overflow-hidden w-full mt-6 sm:mt-8 md:mt-10'>
        <div className='flex whitespace-nowrap animate-[scroll_20s_linear_infinite] sm:animate-[scroll_25s_linear_infinite] md:animate-[scroll_30s_linear_infinite]'>
          <img src={img1} alt="Course preview" className='w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-48 lg:w-80 lg:h-60 mx-2 sm:mx-3 md:mx-4 rounded-lg object-cover shadow-md'/>
          <img src={img2} alt="Course preview" className='w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-48 lg:w-80 lg:h-60 mx-2 sm:mx-3 md:mx-4 rounded-lg object-cover shadow-md'/>
          <img src={img3} alt="Course preview" className='w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-48 lg:w-80 lg:h-60 mx-2 sm:mx-3 md:mx-4 rounded-lg object-cover shadow-md'/>
          <img src={img1} alt="Course preview" className='w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-48 lg:w-80 lg:h-60 mx-2 sm:mx-3 md:mx-4 rounded-lg object-cover shadow-md'/>
          <img src={img2} alt="Course preview" className='w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-48 lg:w-80 lg:h-60 mx-2 sm:mx-3 md:mx-4 rounded-lg object-cover shadow-md'/>
          <img src={img3} alt="Course preview" className='w-48 h-36 sm:w-56 sm:h-44 md:w-64 md:h-48 lg:w-80 lg:h-60 mx-2 sm:mx-3 md:mx-4 rounded-lg object-cover shadow-md'/>
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