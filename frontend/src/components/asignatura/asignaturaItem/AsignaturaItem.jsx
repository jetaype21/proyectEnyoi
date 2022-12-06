import React, { useState } from "react";

const AsignaturaItem = ({ asignatura, handleUpdate, handleDelete }) => {
  const [data, setData] = useState({
    value: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <div className="card" style={{ width: "18rem", background: "pink" }}>
      <div className="card-body">
        <h5 className="card-title h3">{asignatura.value}</h5>
        <form
          onSubmit={(e) => {
            handleUpdate(e, asignatura, data);
            setData({
              value: "",
            });
          }}
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: ".5rem"
          }}
        >
          <input name="value" value={data.value} onChange={handleChange} />
          <button type="submit">Actualizar</button>
        </form>
        <button
          style={{
            position: "absolute",
            top: ".5rem",
            right: ".5rem",
            border: "none",
            borderRadius: ".5rem",
            background: "red",
          }}
          onClick={() => handleDelete(asignatura)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default AsignaturaItem;
