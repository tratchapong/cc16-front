import axios from 'axios'
import {useState, createContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext()

function AuthContextProvider(props) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect( ()=>{
    const run = async () => {
      setLoading(true)
      let token = localStorage.getItem('token')
      if(!token) { return setLoading(false) }
      const {data: userInfo} = await axios.get('http://localhost:8899/auth/me', {
        headers : { Authorization : `Bearer ${token}`}
      })
      setUser(userInfo)
      setLoading(false)
    }
    run()
  },[])

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, setUser, logout, loading}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }
export default AuthContext