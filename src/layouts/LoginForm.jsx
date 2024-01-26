import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [input, setInput] = useState({
    code: "",
    password: "",
  });

  const{user, setUser} = useAuth()
  const navigate = useNavigate()

  const hdlChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault()
    let codeFor = (input.code.toLowerCase().startsWith('t'))? 't_code' : 's_code'
    const output = {
      [codeFor] : input.code,
      password : input.password
    }
    const rs = await axios.post('http://localhost:8899/auth/login', output)
    localStorage.setItem('token', rs.data)
    const {data : userInfo} = await axios.get('http://localhost:8899/auth/me', {
      headers : {
        Authorization: `Bearer ${rs.data}`
      }
    })
    setUser(userInfo)
  }
  return (
    <div className="hero min-h-full bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={hdlSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your code</span>
              </label>
              <input
                type="text"
                placeholder="Code"
                className="input input-bordered"
                name="code"
                value={input.code}
                onChange={hdlChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="password"
                value={input.password}
                onChange={hdlChange}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password? - ติดต่ออาจารย์
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
