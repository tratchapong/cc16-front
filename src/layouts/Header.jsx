import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const guestNav = [
  { to: '/', text: 'Login' },
  { to: '/register', text: 'Register' },
]
const teacherNav = [
  { to: '/', text: 'Home' },
  { to: '/new', text: 'New Homework' },
]
const studentNav = [
  { to: '/', text: 'See Homework' },
]

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { user,logout } = useAuth()
  const [finalNav, setFinalNav] = useState([])

  useEffect(() => {
    setFinalNav(!user?.role
      ? guestNav
      : user?.role === 'teacher'
        ? teacherNav : studentNav)
  }, [user?.role])

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Super Homework, {user?.firstname}</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map(el => (
            <li key={el.to}>
              <Link to={el.to}>{el.text}</Link>
            </li>
          ))
          }
          {user?.role && (
            <li>
              <Link to='/' onClick={logout}>Logout</Link>
            </li>
          )}
        </ul>
        <div className="form-control">
          <input
            type="checkbox"
            className="toggle"
            checked={theme}
            onChange={() => setTheme((prv) => !prv)}
          />
        </div>
      </div>
    </div>
  );
}
