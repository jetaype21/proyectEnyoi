import { Route, Routes, Navigate, Link } from "react-router-dom";
import styles from "./components/Main/styles.module.css";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import { Students } from "./components/students/Students";
import { Teams } from "./components/teams/Teams";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

const StudentsContext = createContext();

function App() {
  const user = localStorage.getItem("token");
  const [students, setstudents] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/students")
      .then((res) => setstudents(res.data.students));
  }, [students]);

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

      <div className={styles.separetedContainer} style={{ minHeight: "500px" }}>
        {user && (
          <aside className={styles.drawer_left}>
            <Link to={"/"}>Home</Link>
            <Link to={"/students"}>estudiantes</Link>
            <Link to={"/teams"}>teams</Link>
          </aside>
        )}

        <StudentsContext.Provider value={students}>
          <Routes>
            {user && <Route path="/" exact element={<Main />} />}
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/students" exact element={<Students />} />
            <Route path="/teams" exact element={<Teams />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
          </Routes>
        </StudentsContext.Provider>
      </div>
    </>
  );
}

export {StudentsContext}
export default App;
