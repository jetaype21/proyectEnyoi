import React from "react";
import "./teams.css";

export const TeamStudents = ({ list }) => {
  return (
    <li className="list-group-item itemCard" style={{ background: "pink" }}>
      <span className="mx-2 fw-bolder">{list.value}</span>
    </li>
  );
};
