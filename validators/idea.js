import Joi from "joi";

function ideaValidator(idea) {
  const schema = Joi.object({
    idea: Joi.string().trim().min(3).max(100).required(),
  });

  return schema.validate(idea);
}

export default ideaValidator;
