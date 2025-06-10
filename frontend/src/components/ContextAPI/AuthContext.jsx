import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider  = ( {children}) => {
    const [isDark,setIsDark] = useState(false)
    const [isLoggedIn,setIsLoggedIn] = useState(false)
  return (
    <AuthContext.Provider
    value={{ isLoggedIn,setIsLoggedIn,isDark,setIsDark}}
    >
      {children}
    </AuthContext.Provider>
  )
}


