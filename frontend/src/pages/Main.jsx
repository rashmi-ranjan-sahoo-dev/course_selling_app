import { useContext } from 'react'
import Header from '../components/Header/Header'
import { AuthContext } from '../components/ContextAPI/AuthContext'
import { Outlet } from 'react-router'
import Body from './Body/Body'
import Footer from '../components/Footer/Footer'



const Main = () => {
  const {isDark} = useContext(AuthContext)
  return (
    <div id='rinku' className= {`h-full w-full ${isDark === 'dark' ? "bg-black text-white" : "bg-white text-black"}`}>
      <Header/>
      <Body/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Main
