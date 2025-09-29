
import Main from './pages/Main'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AdminSignin from './pages/AdminSignin/AdminSignin'
import AdminSignup from './pages/AdminSignup/AdminSignup'
import UserSignin from './pages/UserSignin/UserSignin'
import UserSignup from './pages/UserSignup/UserSignup'
import CourseManage from './pages/CourseManage/CourseManage'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main/>}></Route>
      <Route path= "admin/signup" element={<AdminSignup />} />
       <Route path= "admin/signin" element={<AdminSignin />} />
       <Route path= "user/signup" element={<UserSignup />} />
       <Route path= "user/signin" element={<UserSignin />} />
       <Route path='managecourse' element={<CourseManage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
