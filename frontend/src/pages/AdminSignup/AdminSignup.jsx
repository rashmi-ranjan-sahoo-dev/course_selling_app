import React from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import { useContext } from 'react'
import { AuthContext } from '../../components/ContextAPI/AuthContext'

const AdminSignup = () => {
  const {role, setRole} = useContext(AuthContext);
  setRole("admin")
  return <SignupForm role = {role} />
}

export default AdminSignup
