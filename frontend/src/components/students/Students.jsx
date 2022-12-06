import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { DataContext } from "../../App";
import axiosConfig from "../../config/axiosConfig";
import { StudentItem } from "./student/studentItem";
import styles from "./students.module.css";

export const Students = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [grupos, setGrupo] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    archivado: false,
    asignaturas: [],
    grupo: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/students";
      const { data: res } = await axiosConfig.post(url, data);
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

  const { students, teams } = useContext(DataContext);

  // actualozar archivado
  const handleArchivado = (student) => {
    const url = "/students"
    axiosConfig.put(url, {
        nombres: student.nombres,
        apellidos: student.apellidos,
        email: student.email,
        archivado: student.archivado,
        grupo: student.grupo,
        asignaturas: student.asignaturas
      })

  };

  const handleTeams = (e) => {
    let index = e.currentTarget.options.selectedIndex;

    const nombre = e.currentTarget.options[index].value;
    const valor = grupos.filter((grupo) => grupo.nombre === nombre);
    // console.log(valor[0]);

    setData({
      ...data,
      grupo: valor[0].nombre,
      asignaturas: valor[0].asignaturas
    });
  };

  useEffect(() => {
    setEstudiantes(students);
    setGrupo(teams);
    // console.log(estudiantes);
  }, [students]);

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

      {/*modal de crear estudiantes  */}
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

                <label>selecciona materias:</label>
                <select onChange={(e) => handleTeams(e)}>
                  {grupos.map((grupo) => (
                    <option value={grupo.nombre}>{grupo.nombre}</option>
                  ))}
                </select>

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

      {estudiantes.length === 0 ? (
        <b className="mt-5">No hay estudiantes por favor ingrese uno</b>
      ) : (
        <ul style={{ width: "100%" }}>
          <li className="info infoHeader">
            <section className="infoStudent">
              <span style={{ fontWeight: "bold" }}>nombres</span>
              <span style={{ fontWeight: "bold" }}>apellidos</span>
              <span style={{ fontWeight: "bold" }}>email</span>
            </section>
            <section className="actionsStudents" >
              <span style={{ fontWeight: "bold" }} className="mx-4">accion</span>
              <span style={{ fontWeight: "bold" }} className="mx-4">
                grupo
              </span>
            </section>
          </li>

          {estudiantes.map((student, index) => (
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
