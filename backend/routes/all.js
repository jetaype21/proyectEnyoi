const router = require("express").Router();
const { Asignatura } = require("../models/asignatura");
const { Student } = require("../models/student");
const { Team } = require("../models/team");

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    const teams = await Team.find();
    const asignaturas = await Asignatura.find();

    res.status(201).send({
      data: {
        students,
        teams,
        asignaturas,
      },
      message: "obtenidos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).send({
      message:
        "errores internos por favor vuelva a intentar o comuniquese con el desarrollador",
    });
  }
});

module.exports = router;
