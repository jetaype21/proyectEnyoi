const router = require("express").Router();
const { Team, validate } = require("../models/team");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const team = await Team.findOne({ nombre: req.body.nombre });
    if (team)
      return res.status(409).send({
        message: "¡El equipo con el nombre dado ya existe!",
      });

    await new Team({ ...req.body }).save();
    res.status(201).send({ message: "Equipo creado existosamente." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error internos por favor vuelva a intentar" });
  }
});

router.get("/", async (req, res) => {
  try {
    if (Team.count() === 0)
      return res
        .status(203)
        .send({ message: "No hay equipos empieze a crear uno." });

    const teams = await Team.find();

    res.status(201).send({
      teams,
      message: "estudiantes obtenidos correctamente",
    });
  } catch (error) {
    res
      .status(500)
      .send({
        message:
          "errores internos por favor vuelva a intentar o comuniquese con el desarrollador",
      });
  }
});

module.exports = router;
