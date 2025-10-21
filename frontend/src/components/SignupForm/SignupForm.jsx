import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";


export default function SignupForm({ role }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = role === "admin" ?  `${API}/admin/signup`: `${API}/user/signup`;
      const res = await axios.post(url, formData);
      setMessage(res.data.message || "Signup successful");
      if(res){
        navigate(`/${role}/signin`)
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <form onSubmit={handleSubmit} className="p-4 border rounded w-80 text-center">
      <h2 className="text-xl font-bold mb-3">{role.charAt(0).toUpperCase() + role.slice(1)} Signup</h2>
      <input className="border p-2 w-full mb-2 rounded  font-semibold" name="firstName" placeholder="First Name" onChange={handleChange}/>
      <input className="border p-2 w-full mb-2 rounded  font-semibold" name="lastName" placeholder="Last Name" onChange={handleChange}/>
      <input className="border p-2 w-full mb-2 rounded  font-semibold" type="email" name="email" placeholder="Email" onChange={handleChange}/>
      <input className="border p-2 w-full mb-2 rounded font-semibold" type="password" name="password" placeholder="Password" onChange={handleChange}/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Signup</button>
      <p className="mt-2 text-sm text-gray-600 font-bold">{message}</p>
    </form>
    </div>
  );
}
