import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./teams.css";
import Select from "react-select";
import { TeamStudents } from "./TeamStudents";
import { DataContext } from "../../App";
import axiosConfig from "../../config/axiosConfig";

export const Teams = () => {
  const [grupos, setGrupos] = useState([]); //Todos los grupos
  const [asignaturasTeam, setAsignaturasTeam] = useState([]); // todos las asignaturas en un mismo grupo

  const [error, setError] = useState(""); //! errores
  const [data, setData] = useState({
    nombre: "",
    asignaturas: [],
  });

  const { teams, asignaturas } = useContext(DataContext);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "/teams";
      const { data: res } = await axiosConfig.post(url, {
        ...data,
        asignaturas: asignaturasTeam,
      });

      setData({
        nombre: "",
        asignaturas: [],
      });
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

  const handleMaterias = (e) => {
    setAsignaturasTeam(e);
  };

  useEffect(() => {
  
    setGrupos([...teams]);
  }, [teams]);

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
                <label>Nombre del grupo:</label>
                <input
                  type="text"
                  placeholder="nombres"
                  name="nombre"
                  onChange={handleChange}
                  value={data.nombre}
                  required
                  className={"input"}
                />

                <label>selecciona materias:</label>
                <Select
                  defaultValue={[asignaturas[1]]}
                  isMulti
                  name="colors"
                  options={asignaturas}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(e) => handleMaterias(e)}
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

      {grupos.length === 0 ? (
        <b>Empieze a crear un grupo</b>
      ) : (
        <section className="containerCardsTeam">
          {grupos?.map((team, index) => (
            <div
              key={index}
              className="card"
              style={{ width: "18rem", background: "pink" }}
            >
              <div className="card-body">
                <h5 className="card-title h3 text-center">{team.nombre}</h5>
                <p className="card-text fw-lighter text-start mx-4">asignaturas: </p>
                <ul className="list-group list-group-flush">
                  {team.asignaturas.map((asignaturas, index) => (
                    <TeamStudents key={index} list={asignaturas} />
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
