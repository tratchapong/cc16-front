import axios from 'axios'
import {useState, createContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

function AuthContextProvider(props) {
  const [user, setUser] = useState(null)

  useEffect( ()=>{
    const run = async () => {
      let token = localStorage.getItem('token')
      if(!token) { return }
      const {data: userInfo} = await axios.get('http://localhost:8899/auth/me', {
        headers : { Authorization : `Bearer ${token}`}
      })
      setUser(userInfo)
    }
    run()
  },[])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, setUser, logout}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
export default AuthContext