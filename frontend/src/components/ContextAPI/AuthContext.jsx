import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider  = ( {children}) => {
    const [isDark,setIsDark] = useState(localStorage.getItem("theme")|| "light")
    const [isLoggedIn,setIsLoggedIn] = useState(true)
    const [isActive,setIsActive] = useState(false);
    const [role,setRole] = useState("");

   useEffect(()=>{
    localStorage.setItem('theme', isDark);
   },[isDark])

  return (
    <AuthContext.Provider
    value={{ isLoggedIn,setIsLoggedIn,isDark,setIsDark,isActive,setIsActive,role,setRole}}
    >
      {children}
    </AuthContext.Provider>
  )
}


