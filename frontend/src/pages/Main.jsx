import { useContext } from 'react'
import Header from '../components/Header/Header'
import { AuthContext } from '../components/ContextAPI/AuthContext'
import { FaBlackTie } from 'react-icons/fa6'

const Main = () => {
  const {isDark} = useContext(AuthContext)
  return (
    <div className= {`h-screen w-screen ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <Header/>
    </div>
  )
}

export default Main
