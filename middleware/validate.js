const { body, validationResult } = require('express-validator');

// Validation middleware for the createInventory route
const createInventoryValidation = [

  // Express-validator checks for each field
  body('make').isString().notEmpty(),
  body('model').isString().notEmpty(),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).notEmpty(),
  body('color').isString().notEmpty(),
  body('mileage').isInt({ min: 0 }),
  body('price').isNumeric({ min: 0 }),
  body('transmission').isString().notEmpty(),
  body('fuelType').isString().notEmpty(),
  body('condition').isString().notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },

];

// Validation middleware for the updateInventory route
const updateInventoryValidation = [

  // Similar validation checks as createInventory route
  body('make').isString().notEmpty(),
  body('model').isString().notEmpty(),
  body('year').isInt({ min: 1900, max: new Date().getFullYear() }).notEmpty(),
  body('color').isString().notEmpty(),
  body('mileage').isInt({ min: 0 }),
  body('price').isNumeric({ min: 0 }),
  body('transmission').isString().notEmpty(),
  body('fuelType').isString().notEmpty(),
  body('condition').isString().notEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },

];

module.exports = { createInventoryValidation,  updateInventoryValidation };