import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../ContextAPI/AuthContext";
import { useContext } from "react";

export default function SigninForm({ role }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const {isLoggedIn,setIsLoggedIn} = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = role === "admin" ? "api/vi/admin/signin" : "api/vi/user/signin";
      const res = await axios.post(url, formData);
      localStorage.setItem(`${role}Token`, res.data.token);
      setIsLoggedIn(!isLoggedIn);
      setMessage("Signin successful ✅");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signin failed");
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen">
    <form onSubmit={handleSubmit} className="p-4 border rounded w-80 mx-auto text-center">
      <h2 className="text-xl font-bold mb-3">{role.charAt(0).toUpperCase() + role.slice(1)} Signin</h2>
      <input className="border p-2 w-full mb-2 rounded font-bold" type="email" name="email" placeholder="Email" onChange={handleChange}/>
      <input className="border p-2 w-full mb-2 rounded font-bold" type="password" name="password" placeholder="Password" onChange={handleChange}/>
      <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">Signin</button>
      <p className="mt-2 text-sm text-gray-600">{message}</p>
    </form>
    </div>
  );
}
