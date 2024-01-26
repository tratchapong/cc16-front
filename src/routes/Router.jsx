import {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom'
import Header from '../layouts/Header'
import LoginForm from '../layouts/LoginForm'
import RegisterForm from '../layouts/RegisterForm'
import useAuth from '../hooks/useAuth'
import HomeworkForm from '../layouts/HomeworkForm'

const routerTeacher = createBrowserRouter([
  {
    path : '/',
    element: <>
      <Header />
      <Outlet />
    </>,
    errorElement : <p className='text-4xl'>Page not found</p>,
    children: [
      { index: true, element: <p>Teacher Home</p> },
      { path: '/new', element: <HomeworkForm /> },
      { path: '/logout', element: <p>Logout</p> },
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
      { index: true, element: <p>Student Home</p> },
      { path: '/logout', element: <p>Logout</p> },
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
