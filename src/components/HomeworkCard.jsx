import axios from "axios";
import React from "react";

export default function HomeworkCard(props) {
  const { el, openEdit, setReload } = props;

  const formatDate = (d) => {
    return new Intl.DateTimeFormat("en-UK", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  };

  const hdlDelete = async e => {
    try{
      e.stopPropagation()
      if(confirm('Remove : ' + el.question)){
        const token = localStorage.getItem('token')
        const rs = await axios.delete(`http://localhost:8899/homework/${el.id}`,{
          headers : { Authorization : `Bearer ${token}`}
        })
        setReload(prv=>!prv)
      }
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <>
      <div
        className={`card w-5/6 mx-auto border mt-3 hover:shadow-lg active:shadow-none cursor-pointer ${
          el.published ? "bg-primary" : ""
        }`}
        onClick={()=>openEdit(el)}
      >
        <div className={`card-body `}>
          <div className="card-title">
            <p>{el.subject.title}  <small className="border p-1 rounded">{el.published ? "" : "un-"}published</small></p>
            <div className="badge badge-error badge-outline" onClick={hdlDelete}>Delete</div>
          </div>
          <div className="flex justify-between">
            <p>start : {formatDate(new Date(el.startdate))}</p>
            <p className="text-right">due date : {formatDate(new Date(el.duedate))}</p>
          </div>
          <p className="text-xl">{el.question}</p>
        </div>
      </div>
    </>
  );
}
