import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { MdAttachEmail } from 'react-icons/md';

const CourseManage = () => {

    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        title:"",
        description: "",
        price: "",
        imageUrl: "",
        videos: []
    });

    const [editCourseId, setEditCourseId] = useState(null);

    const fetchCourses = async () =>{
        try{
            const token = localStorage.getItem("adminToken");
            const res = await axios.get("http://localhost:3000/api/v1/admin/course/bulk", {
                headers: { Authorization: `Bearer ${token}`}
            });

            setCourses(res.data.courses);
        }catch (err){
            console.error(err);
        }
    }

    useEffect(() =>{
        fetchCourses();
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value}))
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
             const token = localStorage.getItem("adminToken");

             if(editCourseId) {
                await axios.put("http://localhost:3000/api/v1/admin/course",
                    {...formData, courseId: editCourseId},
                    {headers: { Authorization: `Bearer ${token}`}}
                )
             } else {
                await axios.post("http://localhost/api/v1/admin/course",
                    formData,
                    { headers: { Authorization: `Bearer ${token}`} }
                )
             }

             setFormData ({ title: "", description: "",
                price: "", imageUrl: "", videos: [] })

             setEditCourseId(null);
             fetchCourses();
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (course) =>{
        setEditCourseId(course._id);
        setFormData({
         title: course.title,
         description: course.description,
         price: course.price,
         imageUrl: course.imageUrl,
         videos: course.videos || []
    });
    }

    const handleDelete = async (id) =>{
        try {
            const token = localStorage.getItem("adminToken");

            await axios.delete("http://localhost:3000/api/v1/admin/course",
                {
                    data: { courseId: id },
                    headers: { Authorization: `Bearer ${token}`}
                }
            )
            fetchCourses();
        } catch(err){
            console.log(err);
        }
    } 

  return (
    <div className='p-6'>
       <h1 className='text-2xl font-bold mb-6'>Manage Courses</h1>

       {/* Course Form */}
       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input type="text"
        name="title"
        placeholder='Title'
        value={formData.title}
        onChange={handleChange}
        className='border p-2 w-full'
        />
        <textarea name="description"
        placeholder='Description'
        value={formData.description}
        onChange={handleChange}
        className='border p-2 w-full'
        ></textarea>
        <input type="number"
        name='price'
        placeholder='Price'
        value={formData.price}
        onChange={handleChange}
        className='border p-2 w-full'
        />
        <input type="text"
        name='imageUrl'
        placeholder='Image URL'
        value={formData.imageUrl}
        onChange={handleChange}
        className='border p-2 w-full'
        />

        <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-600 cursor-pointer text-white p-4 p-2 rounded-2xl'>
            {editCourseId ? "Update Course": "Create Course"}
        </button>
       </form>

          {/* course list */}

           <div className='grid gap-6 md:grid-cols-2'>
            {courses.map((course) => {
                <div key={course._id} 
                     className='border p-4 rounded shadow'>
                        <img src={course.imageUrl} alt={course.title}
                             className='w-full h-40 object-cover mb-4' />
                        <h2 className='text-lg font-bold'>{course.title}</h2>
                        <p>{course.description}</p>
                        <p className='font-semibold'>{course.price}</p> 
                        <div className='mt-4 flex gap-2'>
                            <button onClick={() => handleEdit(course)}
                                    className='bg-yellow-500 text-white px-3 py-1 rounded'
                                    >Edit</button>
                            <button onClick={() => handleDelete(course._id)}
                                    className='bg-red-500 text-white px-3 py-1 rounded'
                                    >Delete</button>
                            </div>    
                     </div>
            })}
           </div>
    </div>
  )
}

export default CourseManage
