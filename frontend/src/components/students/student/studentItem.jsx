import axios from "axios";
import React, { useState } from "react";
import "./studentItem.css";

export const StudentItem = ({ student, handleArchivado }) => {
  const [archivado, setArchivado] = useState(false);

  const changedArchivado = () => {
    setArchivado(!archivado)


    handleArchivado({...student, archivado: archivado})
  };

  const deleteStudent = () => {
    const options = {
      method: "DELETE",
      url: "http://localhost:8000/api/students",
      data: { email: student.email },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <li className={`info ${student.archivado ? "archivado" : ""}`}>
      <section className="infoStudent">
        <span className="">{student.nombres}</span>
        <span className="">{student.apellidos}</span>
        <span className="">{student.email}</span>
      </section>
      <section className="actionsStudents">
        <button onClick={changedArchivado}>
          {student.archivado ? "activar" : "desactivar"}
        </button>
        <button onClick={deleteStudent}>Eliminar </button>
      </section>
    </li>
  );
};
