import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header"; 
import { useContext } from "react";
import { AuthContext } from "../../components/ContextAPI/AuthContext";

export default function Purchases() {
  const [courses, setCourses] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const {isDark} = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("userToken"); // token from signin

    axios
      .get("http://localhost:3000/api/v1/user/purchases", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCourses(res.data.courseData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* 🔹 Header at top */}
      <Header />

      {/* 🔹 Page content */}
      <div className="p-6 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center text-sky-600">
          🎓 My Purchased Courses
        </h1>

        {courses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            You haven't purchased any courses yet.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <div key={course._id} className="border rounded-lg shadow p-4 bg-white dark:bg-gray-900">
                <h2 className="text-xl font-semibold mb-2 text-orange-500">
                  {course.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {course.description}
                </p>

                {/* Video List */}
                <div className="space-y-2">
                  {course.videos && course.videos.length > 0 ? (
                    course.videos.map((video, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedVideo(video.url)}
                        className="block w-full text-left bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                      >
                        ▶ {video.title || `Video ${idx + 1}`}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-red-500">No videos available</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Player */}
        {selectedVideo && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Now Playing</h2>
            <iframe
              className="w-full aspect-video rounded-lg shadow"
              src={selectedVideo.replace("watch?v=", "embed/")}
              title="Course Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
