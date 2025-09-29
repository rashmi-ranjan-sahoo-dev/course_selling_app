import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Courses = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() =>{
    axios.get("http://localhost:3000/api/v1/course/preview")
    .then(res => setCourses(res.data.courses))
    .catch(err => console.log(err));
  }, []);

  const handleBuy = async (courseId) =>{
    try{
      const token = localStorage.getItem("userToken");
      await axios.post(
        "http://localhost:3000/api/v1/course/purchase",
        { courseId },
        {headers: { Authorization: `Bearer ${token}`}}
      );
      alert("🎉 Course purchased successfully!")
    } catch(err) {
      console.log(err);
      alert("⚠️ Please login before purchasing.")
    }
  }

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Available Courses</h1>

      <div className='grid gap-6 md:grid-cols-3'>
        {courses.map(course => (
          <div key={course._id}
          className='border rounded-lg shadow p-4'>
            <img
            src={course.imageUrl}
            alt = {course.title} 
            className='w-full h-40 object-center rounded mb-3'/>
            <h2 className='text-xl font-semibold'>{course.title}</h2>
            <p className='text-gray-600 mb-2'>{course.description}</p>
            <p className='text-lg font-bold mb-4'>₹{course.price}</p>

              {/* Preview video if available */}
            {course.videos?.[0]?.isPreview && (
              <iframe
                className="w-full aspect-video mb-3"
                src={course.videos[0].url}
                title="Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              )}

            <button
              onClick={() => handleBuy(course._id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Buy Course
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Courses
