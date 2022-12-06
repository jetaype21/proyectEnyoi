const router = require("express").Router();
const { Student, validate } = require("../models/student");

// creatr
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const student = await Student.findOne({ email: req.body.email });
    if (student)
      return res.status(409).send({
        message: "¡El estudiante con el correo electrónico dado ya existe!",
      });

    await new Student({ ...req.body}).save();
    res.status(201).send({ message: "estudiante creado existosamente." });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error internal por favor vuelva a intentar" });
  }
});

// update
router.put("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const student = await Student.updateOne({ email: req.body.email }, {$set: {archivado: req.body.archivado}});
    
    res.status(201).send({
      student,
       message: "estudiante actualizado existosamente." 
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "errores internos por favor vuelva a intentar" });
  }
});

router.put("/teams", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const student = await Student.updateOne({ email: req.body.estudiante.email }, {$set: {grupo: req.body.grupo, asignaturas: [...req.body.asignaturas]}});
    
    res.status(201).send({
      student,
       message: "estudiante actualizado existosamente." 
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "errores internos por favor vuelva a intentar" });
  }
});

router.get("/", async (req, res) => {
  try {
    
    if (Student.count() === 0)
      return res.status(203).send({ message: "No hay alumnos empieze a crear uno." });

    const students = await Student.find();

    res.status(201).send({ 
      students: students,
      message: "estudiantes obtenidos correctamente" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "errores internos por favor vuelva a intentar o comuniquese con el desarrollador" });
  }
});

router.delete("/", async (req, res) => {
  try {
    
    if (Student.count() === 0)
      return res.status(203).send({ message: "No puede eliminar por que la lista esta vacia." });

    const student = await Student.deleteOne({email: req.body.email});

    res.status(201).send({ 
      student,
      message: "estudiantes eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "errores internos por favor vuelva a intentar o comuniquese con el desarrollador" });
  }
});

module.exports = router;
