const mongoose = require("mongoose");
const Joi = require("joi")

const studentSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  email: { type: String, required: true },
  archivado: {type: Boolean, default: false}
});


const Student = mongoose.model("student", studentSchema);

const validate = (data) => {
  const schema = Joi.object({
    nombres: Joi.string().required().label("nombres"),
    apellidos: Joi.string().required().label("apellidos"),
    email: Joi.string().email().required().label("email"),
    archivado: Joi.boolean().label("archivado"),
  });
  return schema.validate(data);
};

module.exports = { Student, validate };
