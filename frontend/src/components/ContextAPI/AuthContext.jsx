import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider  = ( {children}) => {
    const [isDark,setIsDark] = useState(true)
    const [isLoggedIn,setIsLoggedIn] = useState(true)
    const [isActive,setIsActive] = useState(true)
  return (
    <AuthContext.Provider
    value={{ isLoggedIn,setIsLoggedIn,isDark,setIsDark,isActive,setIsActive}}
    >
      {children}
    </AuthContext.Provider>
  )
}


