import axios from "axios";
import { useState, useEffect } from "react";
import HomeworkCard from "../components/HomeworkCard";
import ModalEditForm from "./ModalEditForm";

export default function TeacherHome() {
  const [homework, setHomework] = useState([]);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const source = axios.CancelToken.source();
    (async () => {
      let token = localStorage.getItem("token");
      const rs = await axios.get("http://localhost:8899/homework", {
        headers: { Authorization: `Bearer ${token}` },
        cancelToken: source.token,
      });
      setHomework(rs.data.homework);
      setLoading(false)
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

  if(loading) {
    return (
      <div className="flex justify-center mt-40">
        <span className="loading loading-dots loading-lg scale-150 text-secondary"></span>
      </div>
    )
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
          { editData.id && <ModalEditForm el={editData} closeEdit={closeEdit} />}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
