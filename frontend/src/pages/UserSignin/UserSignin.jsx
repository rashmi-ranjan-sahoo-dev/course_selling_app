import React from 'react'
import SigninForm from '../../components/SigninForm/SigninForm'
import { useContext } from 'react'
import { AuthContext } from '../../components/ContextAPI/AuthContext'

const UserSignin = () => {
   const {role, setRole} = useContext(AuthContext);
    setRole("user")
  return <SigninForm role= {role} />
}

export default UserSignin

