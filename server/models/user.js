import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    required: [true, 'User ID is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  userType: {
    type: String,
    required: [true, 'Role is required'],
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;