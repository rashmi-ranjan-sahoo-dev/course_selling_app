import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { API } from '../../api';

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    videos: []
  });

  const [videoForm, setVideoForm] = useState({
    title: '',
    url: '',
    duration: '',
    isPreview: false
  });

  const API_BASE = `${API}/admin`;

  const getToken = () => localStorage.getItem('adminToken');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/course/bulk`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setCourses(data.courses || []);
      } else {
        setError(data.error || 'Failed to fetch courses');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVideoForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addVideo = () => {
    if (!videoForm.title || !videoForm.url) {
      alert('Video title and URL are required');
      return;
    }
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, {
        ...videoForm,
        duration: parseInt(videoForm.duration) || 0
      }]
    }));
    setVideoForm({ title: '', url: '', duration: '', isPreview: false });
  };

  const removeVideo = (index) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      imageUrl: '',
      videos: []
    });
    setVideoForm({ title: '', url: '', duration: '', isPreview: false });
    setIsCreating(false);
    setEditingCourse(null);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.price || !formData.imageUrl) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    setError('');
    
    const payload = {
      ...formData,
      price: parseFloat(formData.price)
    };

    if (editingCourse) {
      payload.courseId = editingCourse._id;
    }

    try {
      const response = await fetch(`${API_BASE}/course`, {
        method: editingCourse ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        await fetchCourses();
        resetForm();
        alert(editingCourse ? 'Course updated successfully!' : 'Course created successfully!');
      } else {
        setError(data.error || `Failed to ${editingCourse ? 'update' : 'create'} course`);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE}/course`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ courseId })
      });
      const data = await response.json();
      if (response.ok) {
        setCourses(data.courses || []);
        alert('Course deleted successfully!');
      } else {
        setError(data.error || 'Failed to delete course');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price.toString(),
      imageUrl: course.imageUrl,
      videos: course.videos || []
    });
    setIsCreating(false);
  };

  const startCreate = () => {
    resetForm();
    setIsCreating(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
          {!isCreating && !editingCourse && (
            <button
              onClick={startCreate}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus size={20} />
              Create Course
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {(isCreating || editingCourse) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-medium mb-3">Videos</h3>
                
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <input
                    type="text"
                    name="title"
                    placeholder="Video Title"
                    value={videoForm.title}
                    onChange={handleVideoInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="url"
                    name="url"
                    placeholder="Video URL"
                    value={videoForm.url}
                    onChange={handleVideoInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    name="duration"
                    placeholder="Duration (sec)"
                    value={videoForm.duration}
                    onChange={handleVideoInputChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isPreview"
                      checked={videoForm.isPreview}
                      onChange={handleVideoInputChange}
                      className="w-4 h-4"
                    />
                    <label className="text-sm">Preview</label>
                    <button
                      type="button"
                      onClick={addVideo}
                      className="ml-auto bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {formData.videos.length > 0 && (
                  <div className="space-y-2">
                    {formData.videos.map((video, index) => (
                      <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{video.title}</div>
                          <div className="text-sm text-gray-600">
                            {video.duration}s • {video.isPreview ? 'Preview' : 'Locked'}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  <Save size={18} />
                  {loading ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">All Courses ({courses.length})</h2>
          </div>

          {loading && courses.length === 0 ? (
            <div className="p-12 text-center text-gray-500">Loading courses...</div>
          ) : courses.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No courses yet. Create your first course!
            </div>
          ) : (
            <div className="divide-y">
              {courses.map((course) => (
                <div key={course._id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex gap-4">
                    {course.imageUrl && (
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-32 h-24 object-cover rounded-lg"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="font-semibold text-green-600">${course.price}</span>
                        <span>{course.videos?.length || 0} videos</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(course)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}