import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../ContextAPI/AuthContext';
import { LogOut } from 'lucide-react';

const Logout = ({ role }) => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    
    const handleLogout = () => {
        localStorage.removeItem(`${role}Token`);
        alert("Logged out ✅");
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <div className='absolute right-0 top-12 sm:top-14 md:top-16 w-40 sm:w-44 md:w-48 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn'>
            {/* User Info Section (Optional) */}
            <div className='px-4 py-3 border-b border-gray-200 bg-gray-50'>
                <p className='text-xs sm:text-sm text-gray-600 font-medium capitalize'>
                    {role} Account
                </p>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className='w-full flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base font-medium text-red-600 hover:bg-red-500 hover:text-white transition-colors duration-200'
            >
                <LogOut className='w-4 h-4' />
                Logout
            </button>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    )
}

export default Logout