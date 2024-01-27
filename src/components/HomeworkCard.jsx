import React from "react";

export default function HomeworkCard(props) {
  const { el, openEdit } = props;

  const formatDate = (d) => {
    return new Intl.DateTimeFormat("en-UK", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  };
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
            {el.subject.title} :: <small>{el.published ? "" : "un-"}publish</small>
          </div>
          <div className="flex justify-between">
            <p>start : {formatDate(new Date(el.startdate))}</p>
            <p className="text-right">due date : {formatDate(new Date(el.duedate))}</p>
          </div>
          <p>{el.question}</p>
        </div>
      </div>
    </>
  );
}
