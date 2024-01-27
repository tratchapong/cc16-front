import axios from "axios";
import { useState, useEffect } from "react";
import HomeworkCard from "../components/HomeworkCard";
import ModalEditForm from "./ModalEditForm";

export default function TeacherHome() {
  const [homework, setHomework] = useState([]);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const source = axios.CancelToken.source();
    (async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8899/homework", {
        headers: { Authorization: `Bearer ${token}` },
        cancelToken: source.token,
      });
      setHomework(rs.data.homework);
    })();
    return () => source.cancel();
  }, []);

  const openEdit = (el) => {
    setEditData(el)
    document.getElementById('edit_modal').showModal()
  };

  const closeEdit = () => {
    document.getElementById('edit_modal').close()
  }

  return (
    <>
      <div>
        <hr />
        <h1 className="text-2xl text-center">All Homework</h1>
        <hr />
        {homework.map((el) => (
          <HomeworkCard key={el.id} el={el} openEdit={openEdit} closeEdit={closeEdit} />
        ))}
      </div>
      <dialog id="edit_modal" className="modal">
        <div className="modal-box">
          <ModalEditForm el={editData} closeEdit={closeEdit} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
