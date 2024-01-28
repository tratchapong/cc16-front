import {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom'
import Header from '../layouts/Header'
import LoginForm from '../layouts/LoginForm'
import RegisterForm from '../layouts/RegisterForm'
import useAuth from '../hooks/useAuth'
import HomeworkForm from '../layouts/HomeworkForm'
import TeacherHome from '../layouts/TeacherHome'
import StudentHome from '../layouts/StudentHome'

const routerTeacher = createBrowserRouter([
  {
    path : '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    errorElement : <p className='text-4xl'>Page not found</p>,
    children: [
      { index: true, element: <TeacherHome /> },
      { path: '/new', element: <HomeworkForm /> },
    ]
  }
])
const routerStudent = createBrowserRouter([
  {
    path : '/',
    element: <>
    <Header />
    <Outlet />
    </>,
    errorElement : <p className='text-4xl'>Page not found</p>,
    children: [
      { index: true, element: <StudentHome /> },
    ]
  }
])
const routerGuest = createBrowserRouter([
  {
    path : '/',
    element: <>
    <Header />
    <Outlet />
    </>,
    errorElement : <Navigate to='/' />,
    // errorElement : <p className='text-4xl'>Page not found</p>,
    children: [
      { index: true, element: <LoginForm /> },
      { path: '/register', element: <RegisterForm /> },
    ]
  }
])

export default function Router() {
  const {user} = useAuth()
  let userRole = user?.role
  const finalRouter =  !userRole
    ? routerGuest
    : userRole==='teacher' ? routerTeacher : routerStudent
  return (
    <RouterProvider router={finalRouter}/>
  )
}
