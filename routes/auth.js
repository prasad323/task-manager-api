const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controller/authController');

/**
 * @route   POST /api/auth/register
 * @desc    Register user
 * @body    { name, email, password }
 */
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name should be at least 2 characters'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password should be at least 6 characters')
  ],
  authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user and return JWT
 * @body    { email, password }
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('password').exists().withMessage('Password is required')
  ],
  authController.login
);

module.exports = router;
