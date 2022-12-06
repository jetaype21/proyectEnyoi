const mongoose = require("mongoose");
const Joi = require("joi");

const asignaturaSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String}
});


const Asignatura = mongoose.model("asignatura", asignaturaSchema);

const validate = (data) => {
  const schema = Joi.object({
    value: Joi.string().required().label("value"),
    label: Joi.string().label("label")
  });
  return schema.validate(data);
};

module.exports = { Asignatura, validate };
