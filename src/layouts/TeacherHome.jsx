import axios from 'axios'
import {useState, useEffect} from 'react'
import HomeworkCard from '../components/HomeworkCard'

export default function TeacherHome() {
  const [homework, setHomework] = useState([])

  useEffect( ()=>{
    const source = axios.CancelToken.source();
    (async () => {
      let token = localStorage.getItem('token')
      const rs = await axios.get('http://localhost:8899/homework', {
        headers : { Authorization : `Bearer ${token}`},
        cancelToken : source.token
      })
      setHomework(rs.data.homework)
    })()
    return ()=> source.cancel()
  },[])

  return (
    <div>
      <hr />
      <h1 className="text-2xl text-center">All Homework</h1>
      <hr />
      { homework.map( el=> (
        <HomeworkCard key={el.id} el={el}/>
      )) }
    </div>
  )
}

