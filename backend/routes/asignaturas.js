const router = require("express").Router();
const { Asignatura, validate } = require("../models/asignatura");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const asignatura = await Asignatura.findOne({ value: req.body.value });

    if (asignatura)
      return res.status(409).send({
        message: "¡La materia con el nombre dado ya existe!",
      });

    await new Asignatura({ ...req.body }).save();
    res.status(201).send({ message: "Asignatura creado existosamente." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error internos por favor vuelva a intentar" });
  }
});

router.get("/", async (req, res) => {
  try {
    if (Asignatura.count() === 0)
      return res
        .status(203)
        .send({ message: "No hay asignaturas empieze a crear uno." });

    const asignaturas = await Asignatura.find();

    res.status(201).send({
      asignaturas,
      message: "Asignaturas obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).send({
      message:
        "errores internos por favor vuelva a intentar o comuniquese con el desarrollador",
    });
  }
});

router.put("/", async (req, res) => {
  try {
    if (Asignatura.count() === 0)
      return res
        .status(203)
        .send({ message: "No hay asignaturas empieze a crear uno." });

    const asignatura = await Asignatura.updateOne(
      { _id: req.body._id },
      { $set: { value: req.body.value, label: req.body.value } }
    );

    res.status(201).send({
      asignatura,
      message: "Asignaturas actualizado correctamente",
    });
  } catch (error) {
    res.status(500).send({
      message:
        "errores internos por favor vuelva a intentar o comuniquese con el desarrollador",
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    if (Asignatura.count() === 0)
      return res
        .status(203)
        .send({ message: "No hay asignaturas empieze a crear uno." });

    const asignatura = await Asignatura.deleteOne({ _id: req.body._id });

    res.status(201).send({
      asignatura,
      message: "Asignaturas actualizado correctamente",
    });
    
  } catch (error) {
    res.status(500).send({
      message:
        "errores internos por favor vuelva a intentar o comuniquese con el desarrollador",
    });
  }
});

module.exports = router;
