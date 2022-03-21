import { check, validationResult } from "express-validator";

const validateRegisterUser = () => {
  return [
    check("firstName", "firstName does not Empty").not().isEmpty(),
    check("firstName", "firstName up to 6 characters").isLength({ max: 50 }),

    check("middleName", "middleName does not Empty").not().isEmpty(),
    check("middleName", "middleName up to 6 characters").isLength({ max: 50 }),

    check("lastName", "lastName does not Empty").not().isEmpty(),
    check("lastName", "lastName up to 6 characters").isLength({ max: 50 }),

    check("mobile", "mobile does not Empty").not().isEmpty(),
    check("mobile", "mobile up to 6 characters").isLength({ max: 15 }),

    check("email", "Invalid email").isEmail(),
    check("email", "email up to 6 characters").isLength({ max: 50 }),

    check("passwordHash", "email up to 6 characters").isLength({ min: 6 }),
  ];
};
const validateSign = () => {
  return [
    check("email", "Invalid email").isEmail(),
    check("passwordHash", "password more than 6 degits").isLength({ min: 6 }),
  ];
};

export { validateRegisterUser, validateSign };
