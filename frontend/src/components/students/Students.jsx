import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StudentsContext } from "../../App";
import { StudentItem } from "./student/studentItem";
import styles from "./students.module.css";

export const Students = () => {
  const [students, setstudents] = useState([]);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
  });

  const context = useContext(StudentsContext);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/students";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  // actualozar archivado
  const handleArchivado = (student) => {
    const options = {
      method: "PUT",
      url: "http://localhost:8000/api/students",
      data: {
        nombres: student.nombres,
        apellidos: student.apellidos,
        email: student.email,
        archivado: student.archivado,
      },
    };

    axios
      .request(options)
      .then(function (response) {
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    setstudents(context)
  }, [context, students]);
  

  return (
    <section className={styles.container}>
      <button
        type="button"
        className="btn btn-primary mb-5"
        data-bs-toggle="modal"
        data-bs-target="#modalStudent"
        style={{ background: "#e712cb", border: "none" }}
      >
        Crear estudiante
      </button>

      <div
        className="modal fade"
        id="modalStudent"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crea un nuevo ENYOINER¡¡¡¡
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className={styles.studentForm}>
                <input
                  type="text"
                  placeholder="nombres"
                  name="nombres"
                  onChange={handleChange}
                  value={data.nombres}
                  required
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="apellidos"
                  name="apellidos"
                  onChange={handleChange}
                  value={data.apellidos}
                  required
                  className={styles.input}
                />
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  required
                  className={styles.input}
                />
                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                  Crear
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {students.length === 0 ? (
        <b className="mt-5">No hay estudiantes por favor ingrese uno</b>
      ) : (
        <ul style={{ width: "100%" }}>
          <li className="info infoHeader">
            <section className="infoStudent">
              <span style={{ fontWeight: "bold" }}>nombres</span>
              <span style={{ fontWeight: "bold" }}>apellidos</span>
              <span style={{ fontWeight: "bold" }}>email</span>
            </section>
            <section className="actionsStudents">acciones</section>
          </li>

          {students.map((student, index) => (
            <StudentItem
              key={index}
              student={student}
              handleArchivado={handleArchivado}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
