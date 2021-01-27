import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  dateJoined: Date
});

export const User = model('User', UserSchema);