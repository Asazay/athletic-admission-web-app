const express = require('express');
const { Event } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// validate event data
const validateEvent = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for the event.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description for the event.'),
  check('date')
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage('Please provide a valid date for the event.'),
  check('time')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Please provide a valid time for the event.'),
  handleValidationErrors
];