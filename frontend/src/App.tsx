import { Route, Routes } from 'react-router-dom'
import Landing from '@/pages/Landing'
import TasksPage from './pages/TasksPage'
import Signup from './pages/SignUp'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import './App.css'


function App() {

  return (
    <>
        <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
