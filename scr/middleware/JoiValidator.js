import Joi from "joi";

const signUpValidate = (data) => {
  const signUpUserSchema = Joi.object({
    firstName: Joi.string().alphanum().max(50).required(),
    middleName: Joi.string().alphanum().max(50).required(),
    lastName: Joi.string().alphanum().max(50).required(),
    mobile: Joi.number().max(15).required(),
    email: Joi.string().lowercase().pattern(new RegExp("gmail.com$")).email(),
    passwordHash: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  return signUpUserSchema.validate(data);
};

export { signUpValidate };
