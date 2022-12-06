import React from 'react'

const FormAsignatura = ({handleSubmit, handleChange, data, error}) => {
  return (
    <>
      <button
        type="button"
        className="btn btn-primary mb-5"
        data-bs-toggle="modal"
        data-bs-target="#modalTeam"
        style={{ background: "#e712cb", border: "none" }}
      >
        Crear asignatura
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
                Crea una nueva asignatura¡¡¡
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
                  name="value"
                  onChange={handleChange}
                  value={data.value}
                  required
                  className={"input"}
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
    </>
  );
}

export default FormAsignatura