import mongoose from 'mongoose';

// Define a Mongoose schema for the User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the User model from the schema
const User = mongoose.model('User', UserSchema);
export default User;
