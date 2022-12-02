const mongoose = require("mongoose");
const Joi = require("joi");

const teamSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estudiantes: {type: Array, required: true}
});


const Team = mongoose.model("team", teamSchema);

const validate = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().required().label("nombre"),
    estudiantes: Joi.array().required().label("estudiantes")
  });
  return schema.validate(data);
};

module.exports = { Team, validate };
