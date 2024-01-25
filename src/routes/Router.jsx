import {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom'

const routerTeacher = createBrowserRouter([
  {
    path : '/',
    element: <Outlet />,
    errorElement : <p className='text-4xl'>Page not found</p>,
    children: [
      { index: true, element: <p>Teacher Home</p> },
      { path: '/new', element: <p>new Homework</p> },
      { path: '/logout', element: <p>Logout</p> },
    ]
  }
])
const routerStudent = createBrowserRouter([
  {
    path : '/',
    element: <Outlet />,
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
    element: <Outlet />,
    errorElement : <Navigate to='/' />,
    children: [
      { index: true, element: <p>Guest Home</p> },
    ]
  }
])

export default function Router() {
  let userRole = undefined
  const finalRouter =  !userRole
    ? routerGuest
    : userRole==='teacher' ? routerTeacher : routerStudent
  return (
    <RouterProvider router={finalRouter}/>
  )
}
