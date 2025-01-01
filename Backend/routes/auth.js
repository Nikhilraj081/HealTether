// Importing dependencies
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js'; // Importing the User model

const router = express.Router();

// Register route: Handles user registration
router.post(
  '/register',
  // Input validation using express-validator
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Return validation errors to the client
    }

    const { email, password } = req.body;

    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user and save to database
      const newUser = new User({
        email,
        password: hashedPassword,
      });
      await newUser.save(); // Save the new user to MongoDB

      // Send the token back to the client for authentication
      res.json({"message": "user register successfully"});

    } catch (error) {
      console.error(error); // Log server-side errors
      res.status(500).send('Server Error'); // Return generic server error if something goes wrong
    }
  }
);

// Login route: Handles user login
router.post(
  '/login',
  async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Compare the input password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Generate a JWT token for the logged-in user
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Return the JWT token to the client
      res.json({ token });

    } catch (error) {
      console.error(error); // Log server-side errors
      res.status(500).send('Server Error'); // Return generic server error
    }
  }
);

export default router;
