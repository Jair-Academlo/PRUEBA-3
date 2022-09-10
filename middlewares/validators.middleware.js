const { body, validationResult } = require('express-validator');

const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Error en los parametros de creacion del registro',
      status: 'operacion fallida',
      errors: errors.array(),
    });
  }

  next();
};

const createUserValidators = [
  body('name').notEmpty().withMessage('Name can not be empty'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password can not be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .isAlphanumeric('en-US')
    .withMessage('Password must contain letters and numbers'),
  checkResult,
];

module.exports = { createUserValidators };
