import { useContext } from 'react'
import Header from '../components/Header/Header'
import { AuthContext } from '../components/ContextAPI/AuthContext'
import { Outlet } from 'react-router'
import Body from '../components/Body/Body'



const Main = () => {
  const {isDark,isLoggedIn} = useContext(AuthContext)
  return (
    <div className= {`h-screen w-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Header/>
      {isLoggedIn ?<Body/>:<Outlet/>}
    </div>
  )
}

export default Main
