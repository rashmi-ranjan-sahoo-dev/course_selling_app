import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../ContextAPI/AuthContext';

const Logout = ({ role }) => {

    const navigate = useNavigate();

    const { setIsLoggedIn} = useContext(AuthContext);
    const handleLogout = () =>{
        localStorage.removeItem(`${role}Token`);

        alert("Logged out ✅");
        setIsLoggedIn(false)

        navigate("/")
    }

  return (
    <button
    onClick={handleLogout}
    className='bg-red-400 hover:bg-red-600 px-4 py-2 rounded-xl w-fit h-fit p-4 relative top-12'>
     Logout
    </button>
  )
}

export default Logout
