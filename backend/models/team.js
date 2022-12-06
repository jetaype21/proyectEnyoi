const mongoose = require("mongoose");
const Joi = require("joi");

const teamSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  asignaturas: {type: Array, required: true}
});


const Team = mongoose.model("team", teamSchema);

const validate = (data) => {
  const schema = Joi.object({
    nombre: Joi.string().required().label("nombre"),
    asignaturas: Joi.array().required().label("asignaturas")
  });
  return schema.validate(data);
};

module.exports = { Team, validate };
