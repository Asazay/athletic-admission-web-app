// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({min:3, max: 16 })
      .withMessage('First Name required, must be between 3 to 16 characters.'),
    check('lastName')
      .exists({ checkFalsy: true })
      .isLength({min:3, max: 16 })
      .withMessage('Last Name required must be between 3 to 16 characters.'),
    check('role')
      .exists({ checkFalsy: true })
      .isIn(['user', 'admin', 'principal'])
      .withMessage('Role must be either user, admin, or principal.'),
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 8 })
      .withMessage('Password must be 8 characters or more.'),
    handleValidationErrors
  ];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, role, schoolId } = req.body;
      const hashedPassword = bcrypt.hashSync(password);

      const createBody = {firstName, lastName, email, hashedPassword, role}
      if (schoolId) createBody.schoolId = schoolId;

      const user = await User.create(createBody);
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

module.exports = router;