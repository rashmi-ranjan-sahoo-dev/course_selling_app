import React from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import { useContext } from 'react'
import { AuthContext } from '../../components/ContextAPI/AuthContext'

const UserSignup = () => {
   const {role, setRole} = useContext(AuthContext);
      setRole("user")
  return <SignupForm role= {role} />
}

export default UserSignup
