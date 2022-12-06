import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../App";
import "./asignatura.css";
import axiosConfig from "../../config/axiosConfig";
import AsignaturaItem from "./asignaturaItem/AsignaturaItem";
import FormAsignatura from "./formAsignatura/FormAsignatura";

export const Asignaturas = () => {
  const [asignaturasInfo, setAsignaturasInfo] = useState([]);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    value: "",
    label: "",
  });

  const { asignaturas } = useContext(DataContext);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "/asignaturas";
      const { data: res } = await axiosConfig.post(url, {
        ...data,
        label: data.value,
      });
      setData({
        value: "",
        label: "",
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

  // actualizar 
  const handleUpdate = async (e, item, data) => {
    e.preventDefault();

    try {
      const url = "/asignaturas";
      const { data: res } = await axiosConfig.put(url, {
        ...item, value: data.value 
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
  }

  const handleDelete = (item) => {
    const url = "/asignaturas"
    axiosConfig.delete(url, {data: {...item}}).then(res => console.log(res.data))
  }

  useEffect(() => {
    setAsignaturasInfo(asignaturas);
  }, [asignaturas]);

  return (
    <section className="container p-5">
      <FormAsignatura data={data} error={error} handleChange={handleChange} handleSubmit={handleSubmit} />

      {asignaturasInfo.length === 0 ? (
        <b>Empieze a crear una nueva asignatura</b>
      ) : (
        <section className="containerCardsTeam">
          {asignaturasInfo?.map((asignatura, index) => (
            <AsignaturaItem key={index} asignatura={asignatura} handleUpdate={handleUpdate} handleDelete={handleDelete} />
          ))}
        </section>
      )}
    </section>
  );
};
