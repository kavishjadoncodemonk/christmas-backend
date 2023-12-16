const joi = require("@hapi/joi");

const schema = joi.object({
  name: joi.string().min(3).required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  wishes: joi.array().items(
    joi.object({
      title: joi.string(),
      link: joi.string().uri(),
    })
  ),
  address: joi.string().min(3).max(256),
  isGiftReceived: joi.boolean().default(false),
});

module.exports = schema;
