// Importing dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json()); // Body parser middleware to handle POST request data
app.use(cors()); // Cross-Origin Resource Sharing for enabling cross-origin requests

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if database connection fails
  });

// Database connection and server start
// const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// mongoose.connect('mongodb+srv://nikhilraj081:Nraj957273@cluster0.nhmqgp6.mongodb.net/HealTether?retryWrites=true&w=majority&appName=Cluster0', options)
//   .then(() => {
//     console.log('Connected to the database');
//     // Define the port and start the server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((error) => {
//     console.error('Error connecting to the database:', error);
//   });

// Import and use authentication routes
app.use('/api/auth', authRoutes);

console.log('Connected to the database');
    // Define the port and start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


