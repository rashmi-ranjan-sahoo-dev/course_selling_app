import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/Header/Header';
import { useContext } from 'react';
import { AuthContext } from '../../components/ContextAPI/AuthContext';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const {isDrak} = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/course/preview")
      .then(res => setCourses(res.data.courses))
      .catch(err => console.log(err));
  }, []);

  const handleBuy = async (courseId) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.post(
        "http://localhost:3000/api/v1/course/purchase",
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("🎉 Course purchased successfully!");
    } catch (err) {
      console.log(err);
      alert("⚠️ Please login before purchasing.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDrak ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* 🔹 Header */}
      <Header />

      {/* 🔹 Page content */}
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center text-sky-600">
          📚 Available Courses
        </h1>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map(course => (
            <div
              key={course._id}
              className="border rounded-lg shadow p-4 bg-white dark:bg-gray-900"
            >
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold text-orange-500">
                {course.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {course.description}
              </p>
              <p className="text-lg font-bold mb-4 text-green-600">
                ₹{course.price}
              </p>

              {/* Preview video if available */}
              {course.videos?.[0]?.isPreview && (
                <iframe
                  className="w-full aspect-video mb-3 rounded"
                  src={course.videos[0].url}
                  title="Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}

              <button
                onClick={() => handleBuy(course._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Buy Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
