import { Link } from "react-router-dom";
import useTheme from "../hooks/useTheme";

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Super Homework</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
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
