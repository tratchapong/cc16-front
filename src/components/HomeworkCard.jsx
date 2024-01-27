import React from 'react'

export default function HomeworkCard(props) {
  const {el} = props

  const formatDate = (d) => {
    return new Intl.DateTimeFormat("en-AU", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(d)
  
  }
  return (
    <div className="card w-5/6 mx-auto border mt-3">
    <div className="card-body">
      <div className="card-title">HTML <small>{el.published ? '' : 'un'}-publish</small></div>
      <div className="flex justify-between">
        <p>start : {formatDate(new Date(el.startdate))}</p>
        <p className='text-right'>due date : {formatDate(new Date(el.duedate))}</p>
      </div>
      <p>{el.question}</p>
    </div>
  </div>
  )
}
