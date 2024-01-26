import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HomeworkForm() {
  const [input, setInput] = useState({
    subject_id: "",
    question: "",
    startdate: new Date(),
    duedate: new Date(),
    publish: false,
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlChangeDate = (date, field) => {
    setInput((prv) => ({ ...prv, [field]: date }));
  };

  const hdlSubmit = (e) => {
    e.preventDefault()
    console.log(JSON.stringify(input))
  }

  return (
    <div className="min-w-[600px] w-4/6 flex flex-col gap-3 border mx-auto p-3">
      <h1 className="text-4xl">New Homework</h1>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Select Subject</span>
          </div>
          <select
            value={input.subject_id}
            className="select select-primary w-full max-w-xs"
            name="subject_id"
            onChange={hdlChange}
          >
            <option value="" disabled>
              Please select..
            </option>
            <option value="1">HTML</option>
            <option value="2">CSS</option>
            <option value="3">Javascript</option>
            <option value="4">React.js</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Question</span>
          </div>
          <textarea
            placeholder="Question"
            className="textarea textarea-bordered textarea-lg w-full"
            name="question"
            value={input.question}
            onChange={hdlChange}
          ></textarea>
        </label>
        <div className="flex justify-between">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Start date</span>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={input.startdate}
              onChange={(date) => hdlChangeDate(date, "startdate")}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">due date</span>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={input.duedate}
              onChange={(date) => hdlChangeDate(date, "duedate")}
            />
          </label>
        </div>
        <div className="form-control w-full">
          <label className="cursor-pointer label justify-start gap-2">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={input.publish}
              onChange={(e) => setInput((prv) => ({ ...prv, publish: !prv.publish }))}
            />
            <span className="label-text">Publish </span>
          </label>
        </div>
        {/* <input type="date" onChange={e=>console.log(e.target.value)} /> */}
        <button className="btn btn-outline btn-secondary mt-40">Submit</button>
      </form>
    </div>
  );
}
