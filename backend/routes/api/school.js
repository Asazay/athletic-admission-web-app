const express = require('express');
const { School } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validate school data
const validateSchool = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a school name.'),
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a school address.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state.'),
  check('zipCode')
    .exists({ checkFalsy: true })
    .isPostalCode('US')
    .withMessage('Please provide a valid US zip code.'),
  handleValidationErrors
];

// Get all schools
router.get(
  '/',
  async (req, res) => {
    const schools = await School.findAll();
    return res.json({ schools });
  }
);

// Get a school by search
router.get(
  '/search',
  async (req, res) => {
    const { name, state, city, zipcode } = req.query;
    const schools = await School.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        },
        state: {
          [Op.iLike]: `%${state}%`
        },
        city: {
          [Op.iLike]: `%${city}%`
        },
        zipCode: {
          [Op.iLike]: `%${zipcode}%`
        }
      }
    });
    if (!schools || !schools.length) {
      const err = new Error('No schools found');
      err.status = 404;
      err.title = 'No schools found';
      err.errors = { school: 'No schools match the provided search criteria.' };
      return next(err);
    }

    return res.json({ schools });
  }
);


// Create a new school
router.post(
    '/', validateSchool,
    async (req, res) => {
      const { name, address, city, state, zipCode } = req.body;

      const school = await School.create({ name, address, city, state, zipCode });

      if(!school) {
        const err = new Error('School creation failed');
        err.status = 400;
        err.title = 'School creation failed';
        err.errors = { school: 'The provided school details were invalid.' };
        return next(err);
      }
      const safeSchool = {
        name: school.name,
        address: school.address,
        city: school.city,
        state: school.state,
        zipCode: school.zipCode
      };
      return res.status(201).json({
        school: safeSchool
      });
    }
  );

  // Update a school
  router.put(
    '/:schoolId', validateSchool,
    async (req, res) => {
      const { schoolId } = req.params;
      const { name, address, city, state, zipCode } = req.body;

      const school = await School.findByPk(schoolId);

      if (!school) {
        const err = new Error('School not found');
        err.status = 404;
        err.title = 'School not found';
        err.errors = { school: 'No school found with the provided ID.' };
        return next(err);
      }

      await school.update({ name, address, city, state, zipCode });

      return res.json({
        school
      });
    }
  );

// Delete a school
router.delete(
  '/:schoolId',
  async (req, res) => {
    const { schoolId } = req.params;

    const school = await School.findByPk(schoolId);

    if (!school) {
      const err = new Error('School not found');
      err.status = 404;
      err.title = 'School not found';
      err.errors = { school: 'No school found with the provided ID.' };
      return next(err);
    }

    await school.destroy();

    return res.status(204).json({Success: 'School deleted successfully'});
  }
);

module.exports = router;