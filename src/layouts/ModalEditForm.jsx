import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ModalEditForm(props) {
  const { el, closeEdit, reload, setReload } = props;
  console.log(el)
  const [input, setInput] = useState({
    subject_id: '',
    question: '',
    startdate: new Date(),
    duedate: new Date(),
    published: '',
  });

  const [subject, setSubject] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    let rs
    const run = async () => {
      try {
        rs = await axios.get("http://localhost:8899/subject", { cancelToken: source.token });
        setSubject(rs.data.subject);
      } catch (err) {
        console.log(err)
      }
    };
    run();
    return () => source.cancel();
  }, []);

  useEffect(() => {
    setInput({
      subject_id: el.subject_id,
      question: el.question,
      startdate: el.startdate ? new Date(el.startdate) : new Date(),
      duedate: el.duedate ? new Date(el.duedate) : new Date(),
      published: el.published,
    });
  }, [el.id,el.subject_id,el.question,el.startdate,el.duedate,el.published]);

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlChangeDate = (date, field) => {
    setInput((prv) => ({ ...prv, [field]: date }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
    const rs = await axios.put(`http://localhost:8899/homework/${el.id}`, input, {
      headers : { Authorization : `Bearer ${token}`}
    })
    } catch (err) {
      alert(JSON.stringify(err?.data?.response?.error))
    }
    closeEdit();
    setReload(prv=>!prv)
  }

  return (
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
          {subject.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
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
      <div className="form-control w-full">
        <label className="cursor-pointer label justify-start gap-2">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={input.published}
            onChange={(e) => setInput((prv) => ({ ...prv, published: !prv.published }))}
          />
          <span className="label-text">published </span>
        </label>
      </div>
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
      <div className="flex mt-60">
      <button type="submit" className="btn btn-outline btn-primary flex-1">Submit</button>
      <button type="button" onClick={closeEdit} className="btn btn-outline btn-secondary flex-1">Cancel</button>
      </div>
    </form>
  );
}
