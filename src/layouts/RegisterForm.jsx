import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [input, setInput] = useState({
    code: "",
    firstname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate()

  const hdlChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault()
    let codeFor = (input.code.toLowerCase().startsWith('t'))? 't_code' : 's_code'
    const output = {
      [codeFor] : input.code,
      firstname : input.firstname,
      email : input.email,
      password : input.password,
      confirmPassword : input.confirmPassword
    }
    // console.log(output)
    try {
      await axios.post('http://localhost:8899/auth/register', output)
    } catch (err) {
      console.log(err)
      return alert(err.response?.data?.error)
    }
    navigate('/')
  }
  return (
    <div className="hero min-h-full bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register</h1>
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
                pattern="^s\d{3}$"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="first name"
                className="input input-bordered"
                name="firstname"
                value={input.firstname}
                onChange={hdlChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">E-mail</span>
              </label>
              <input
                type="email"
                placeholder="e-mail"
                className="input input-bordered"
                name="email"
                value={input.email}
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={hdlChange}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  กรุณาตรวจสอบรหัสนักศึกษาให้ถูกต้อง
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
