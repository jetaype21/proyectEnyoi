const mongoose = require("mongoose");
const Joi = require("joi")

const studentSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  archivado: { type: Boolean, default: false },
  asignaturas: { type: Array, required: true },
  grupo: { type: String, required: true },
});


const Student = mongoose.model("student", studentSchema);

const validate = (data) => {
  const schema = Joi.object({
    nombres: Joi.string().required().label("nombres"),
    apellidos: Joi.string().required().label("apellidos"),
    email: Joi.string().email().required().label("email"),
    grupo: Joi.string().required().label("grupo"),
    asignaturas: Joi.array().required().label("asignaturas"),
    archivado: Joi.boolean().label("archivado"),
  });
  return schema.validate(data);
};

module.exports = { Student, validate };
