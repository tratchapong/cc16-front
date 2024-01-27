import axios from 'axios'
import {useState, useEffect} from 'react'

export default function TeacherHome() {
  const [homework, setHomework] = useState([])

  useEffect( ()=>{
    const run = async () => {
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8899/homework', {
        headers : { Authorization : `Bearer ${token}`}
      })
      setHomework(rs.data.homework)
    }
    run()
  },[])

  return (
    <div>
      <h1 className="text-4xl">All Homework</h1>
      <div className="prose">
      <ul>
      {homework?.map(el => (
        <li key={el.id}>{JSON.stringify(el)}</li>
        ))}
      </ul>
      </div>
    </div>
  )
}
