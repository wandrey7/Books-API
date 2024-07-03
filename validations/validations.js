const { check, body, validationResult } = require("express-validator");

const validateId = (req, res, next) => {
  check("id", "Invalid ID. It must be a positive integer.").isInt({
    min: 1,
  })(req, res, next);
};

const validateBooks = [
  body("*.title")
    .notEmpty()
    .withMessage("The Title field is mandatory")
    .isString()
    .withMessage("The Title field must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("The Title field must be between 3 and 100 characters long"),

  body("*.author")
    .notEmpty()
    .withMessage("The Author field is mandatory")
    .isString()
    .withMessage("The Author field must be a string")
    .isLength({ min: 5, max: 100 })
    .withMessage("The Author field must be between 5 and 100 characters long"),

  body("*.genre")
    .notEmpty()
    .withMessage("The Genre field is mandatory")
    .isString()
    .withMessage("The Genre field must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("The Genre field must be between 3 and 100 characters long"),

  body("*.isbn").optional().isISBN().withMessage("The ISBN field is incorrect"),
];

module.exports = {
  validateId,
  validateBooks,
};
