// backend/routes/api/session.js
const express = require('express');
const {Op, json} = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser} = require('../../utils/auth');
const { User, School } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const school = require('../../db/models/school');

const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

// Restore session user
router.get(
    '/',
    (req, res) => {
      const { user } = req;
     
      if (user) {
        const safeUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          email: user.email,
        };

        if(user && user.School && user.School.id) safeUser.school = user.School;

        return res.json({
          user: safeUser
        });
      } else return res.json({ user: null });
    }
  );
  

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.unscoped().findOne({
        where: {
            email: credential
        },
        include:{
          model: School,
        }, 
        raw: true,
        nest: true
      });
  
      if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
      }
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
      };

      if(user.School && user.School.id) safeUser.school = user.School;
  
      await setTokenCookie(res, safeUser);
  
      return res.json({
        user: safeUser
      });
    }
  );

  // Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'Successfully logged out' });
    }
  );

module.exports = router;