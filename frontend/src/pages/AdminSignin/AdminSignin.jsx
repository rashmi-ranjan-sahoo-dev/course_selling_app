import React from 'react'
import SigninForm from '../../components/SigninForm/SigninForm'
import { useContext } from 'react'
import { AuthContext } from '../../components/ContextAPI/AuthContext'

const AdminSignin = () => {
   const {role, setRole} = useContext(AuthContext);
    setRole("admin")
  return <SigninForm role = {role} />
}

export default AdminSignin
