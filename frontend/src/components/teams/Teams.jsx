import axios from "axios";
import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { StudentsContext } from "../../App";
import "./teams.css";
import Select from "react-select";
import { TeamStudents } from "./TeamStudents";

export const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [studentsTeam, setstudentsTeam] = useState([]);
  const [students, setstudents] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    nombre: "",
    estudiantes: [],
  });

  const context = useContext(StudentsContext);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const hadleSelect = (e) => {
    let studentsTeam = [];

    e.map(
      (item) =>
        (studentsTeam = [
          ...studentsTeam,
          {
            nombres: item.nombres,
            apellidos: item.apellidos,
            email: item.email,
            archivado: item.archivado,
          },
        ])
    );

    setstudentsTeam(studentsTeam);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("studentsTeam");
    // console.log(studentsTeam);

    console.log({ ...data, estudiantes: studentsTeam });
    try {
      const url = "http://localhost:8000/api/teams";
      const { data: res } = await axios.post(url, {
        ...data,
        estudiantes: studentsTeam,
      });
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

  useEffect(() => {
    let students = [];

    context.map((item, index) =>
      item.archivado
        ? null
        : (students = [
            ...students,
            { ...item, value: item.nombres + index, label: item.nombres },
          ])
    );

    // console.log(students);
    setstudents(students);

    axios.get("http://localhost:8000/api/teams").then((res) => {
      setTeams(res.data.teams);
    });
  }, [context]);
  return (
    <section className="container p-5">
      <button
        type="button"
        className="btn btn-primary mb-5"
        data-bs-toggle="modal"
        data-bs-target="#modalTeam"
        style={{ background: "#e712cb", border: "none" }}
      >
        Crear grupo
      </button>

      <div
        className="modal fade"
        id="modalTeam"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Crea un nuevo Equipo¡¡¡
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className={"teamsForm"}>
                <input
                  type="text"
                  placeholder="nombres"
                  name="nombre"
                  onChange={handleChange}
                  value={data.nombre}
                  required
                  className={"input"}
                />

                <Select
                  defaultValue={[students[1]]}
                  isMulti
                  name="colors"
                  options={students}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => hadleSelect(e)}
                />

                {error && <div className={"error_msg"}>{error}</div>}
                <button type="submit" className={"green_btn"}>
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

      {teams.length === 0 ? (
        <b>Empieze a crear un grupo</b>
      ) : (
        <section className="containerCardsTeam">
          {teams?.map((team, index) => (
            <div
              className="card"
              style={{ width: "18rem", background: "pink" }}
            >
              <div className="card-body">
                <h5 className="card-title h3">{team.nombre}</h5>
                <p className="card-text fw-bold">Integrantes: </p>
                <ul className="list-group list-group-flush">
                  {team.estudiantes.map((student, index) => (
                    <TeamStudents key={index} list={student} />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
};
