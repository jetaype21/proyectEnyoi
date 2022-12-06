import { Route, Routes, Navigate, Link } from "react-router-dom";
import styles from "./components/Main/styles.module.css";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { Students } from "./components/students/Students";
import { Teams } from "./components/teams/Teams";
import { createContext, useEffect, useState } from "react";
import { Asignaturas } from "./components/asignatura/Asignatura";
import axios from "axios";

const DataContext = createContext();

function App() {
  const user = localStorage.getItem("token");
  const [data, setData] = useState({
    students: [],
    teams: [],
    asignaturas: [],
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/all").then(res => {
      setData(res.data.data);
      // setData({...res.data.data})
    })
  }, [data]);

  return (
    <>
      {user && (
        <nav className={styles.navbar}>
          <h1>Enyoi</h1>
          <button className={styles.white_btn} onClick={handleLogout}>
            Logout
          </button>
        </nav>
      )}

      {/* {console.log(data)} */}
      <div className={styles.separetedContainer} style={{ minHeight: "500px" }}>
        {user && (
          <aside className={styles.drawer_left}>
            <Link to={"/"}>Home</Link>
            <Link to={"/students"}>estudiantes</Link>
            <Link to={"/teams"}>teams</Link>
            <Link to={"/asignaturas"}>asignaturas</Link>
          </aside>
        )}

        <DataContext.Provider value={data}>
          <Routes>
            {user && <Route path="/" exact element={<Main />} /> }
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            {user && <Route path="/students" exact element={<Students />} />}
            {user && <Route path="/teams" exact element={<Teams />} />}
            {user && <Route path="/asignaturas" exact element={<Asignaturas />} />}
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </DataContext.Provider>
      </div>
    </>
  );
}

export { DataContext };
export default App;
