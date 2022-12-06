import axios from "axios";
import React, { useState } from "react";
import "./studentItem.css";

export const StudentItem = ({ student, handleArchivado }) => {
  const [archivado, setArchivado] = useState(false);

  const changedArchivado = () => {
    setArchivado(!archivado);

    handleArchivado({ ...student, archivado: archivado });
  };

  return (
    <>
      <li className={`info ${student.archivado ? "archivado" : "bgGreen"}`}>
        <section className="infoStudent">
          <span className="">{student.nombres}</span>
          <span className="">{student.apellidos}</span>
          <span className="">{student.email}</span>
        </section>
        <section className="actionsStudents">
          <button onClick={changedArchivado}>
            {student.archivado ? "activar" : "desactivar"}
          </button>
          <span> {student.grupo.trim() ? student.grupo : "N/A"} </span>
        </section>
      </li>
      <section
        className={`${student.archivado ? "archivado" : "bgGreen"}`}
      >
        <span
          className="mx-2"
          style={{
            display: "flex",
            overflow: "auto",
            marginBottom: ".9rem",
          }}
        >
          {"MATERIAS:"}
          {student.asignaturas.map((asignatura, index) => (
            <b key={index}> {asignatura.value} - </b>
          ))}{" "}
        </span>
      </section>
    </>
  );
};
