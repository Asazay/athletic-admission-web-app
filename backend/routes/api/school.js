const express = require("express");
const { Op } = require("sequelize");
const { School } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Validate school data
const validateSchool = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a school name."),
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a school address."),
  check("city")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a city."),
  check("state")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a state."),
  check("zipCode")
    .exists({ checkFalsy: true })
    .isPostalCode("US")
    .withMessage("Please provide a valid US zip code."),
  handleValidationErrors,
];

// Get all schools
router.get("/", async (req, res) => {
  let schools = await School.findAll();
  if (schools) {
    schools = Object.values(schools);
  }
  return res.json(schools);
});

// Get a school by search
router.get("/search", async (req, res) => {
  const { name, state, city, zipCode } = req.query;

  const where = {};

  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    };
  }

  if (state) {
    where.state = {
      [Op.like]: `%${state}%`,
    };
  }

  if (city) {
    where.city = {
      [Op.like]: `%${city}%`,
    };
  }
  if (zipCode && parseInt(zipCode)) {
    console.log(zipCode)
    where.zipCode = {
      [Op.like]: `%${parseInt(zipCode)}%`,
    };
  }

  const schools = await School.findAll({
    where: where,
  });

  // if (!schools || !schools.length) {
  //   const err = new Error('No schools found');
  //   err.status = 404;
  //   err.title = 'No schools found';
  //   err.errors = { school: 'No schools match the provided search criteria.' };
  //   res.json(err);
  // }

  if (!schools || !schools.length) {
    return res.json([]);
  }
  let schoolArray = Object.values(schools);

  return res.json(schoolArray);
});

// Get school by ID
router.get("/:schoolId", async (req, res) => {
  const { schoolId } = req.params;
  const school = await School.findByPk(schoolId);

  if (!school) {
    const err = new Error("School not found");
    err.status = 404;
    err.title = "School not found";
    err.errors = { school: "No school found with the provided ID." };
    return next(err);
  }

  return res.json({ school });
});

// Create a new school
router.post("/", validateSchool, async (req, res) => {
  const { name, address, city, state, zipCode } = req.body;

  const school = await School.create({ name, address, city, state, zipCode });

  if (!school) {
    const err = new Error("School creation failed");
    err.status = 400;
    err.title = "School creation failed";
    err.errors = { school: "The provided school details were invalid." };
    return next(err);
  }
  const safeSchool = {
    name: school.name,
    address: school.address,
    city: school.city,
    state: school.state,
    zipCode: school.zipCode,
  };
  return res.status(201).json({
    school: safeSchool,
  });
});

// Update a school
router.put("/:schoolId", validateSchool, async (req, res) => {
  const { schoolId } = req.params;
  const { name, address, city, state, zipCode } = req.body;

  const school = await School.findByPk(schoolId);

  if (!school) {
    const err = new Error("School not found");
    err.status = 404;
    err.title = "School not found";
    err.errors = { school: "No school found with the provided ID." };
    return next(err);
  }

  await school.update({ name, address, city, state, zipCode });

  return res.json({
    school,
  });
});

// Delete a school
router.delete("/:schoolId", async (req, res) => {
  const { schoolId } = req.params;

  const school = await School.findByPk(schoolId);

  if (!school) {
    const err = new Error("School not found");
    err.status = 404;
    err.title = "School not found";
    err.errors = { school: "No school found with the provided ID." };
    return next(err);
  }

  await school.destroy();

  return res.status(204).json({ Success: "School deleted successfully" });
});

module.exports = router;
