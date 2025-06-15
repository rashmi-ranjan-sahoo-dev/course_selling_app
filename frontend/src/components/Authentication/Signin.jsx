import {useContext} from 'react'
import { useState } from 'react';
import axios from 'axios'
import { AuthContext } from '../ContextAPI/AuthContext';

const Signin = ( ) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const { setIsLoggedIn,setName } = useContext(AuthContext)

    const {isDark} = useContext(AuthContext)
    const handelSignin = async (e) =>{
      e.preventDefault();   
    try{
      const response = await axios.post('http://localhost:3000/api/v1/users/signin',{
        email:email,
        password:password
      })

      alert(response.data.msg);
      setName(response.data.firstName);
      localStorage.setItem("token",response.data.token)
        setIsLoggedIn(true)

    }catch(error){
      if(error.response){
        alert(error.response.data.msg || "Login failed")
      }else{
        alert("Network")
      }
    }
  }

  return (
    <div>
      <div 
      className={` ${isDark ? "bg-black" : "bg-white "} flex items-center justify-center min-h-screen  w-full`}>
      <form 
      className='md:w-100 w-fit sm:h-110 sm:border-2 p-5 sm:p-10 text-center bg-gray-100 border-none rounded-3xl' 
      onSubmit={handelSignin}>
        <h1 className='sm:text-4xl text-2xl sm:pb-5 pb-3 text-gray-900'>Signin</h1>
             <h1 className='sm:font-bold sm:pb-5 pb-3 text-gray-900'>👋 Hii , Welcome Back</h1>
          <input 
          type="text" 
          name='email' 
          placeholder='email' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=' border text-center rounded-xl sm:p-3 p-2 block w-full sm:text-xl bg-white text-gray-700 '/>
          <br />
          <input 
          type="text" 
          name='password' 
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=' border text-center rounded-xl sm:p-3 p-2 block w-full sm:text-xl bg-white text-gray-700 '
          />
          <br />
          <button 
          className='w-fit sm:text-xl sm:p-2 p-2 rounded-xl bg-blue-600 shadow-lg mb-2' 
          type='submit'>SignUp</button>
          <p>Don't have an account? <a className='font-bold' href="/signup" >Signup</a></p>
      </form>
    </div>
    </div>
  )
}

export default Signin
