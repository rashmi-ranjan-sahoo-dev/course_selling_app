import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
      const url = role === "admin" ? "api/vi/admin/signup" : "api/vi/user/signup";
      const res = await axios.post(url, formData);
      setMessage(res.data.message || "Signup successful");
      if(res){
        navigate(`${role}/signin`)
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded w-80 mx-auto mt-10">
      <h2 className="text-xl font-bold mb-3">{role} Signup</h2>
      <input className="border p-2 w-full mb-2" name="firstName" placeholder="First Name" onChange={handleChange}/>
      <input className="border p-2 w-full mb-2" name="lastName" placeholder="Last Name" onChange={handleChange}/>
      <input className="border p-2 w-full mb-2" type="email" name="email" placeholder="Email" onChange={handleChange}/>
      <input className="border p-2 w-full mb-2" type="password" name="password" placeholder="Password" onChange={handleChange}/>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Signup</button>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </form>
  );
}
