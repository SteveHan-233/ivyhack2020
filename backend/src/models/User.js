const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new moongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = bcrypt.hash(user.password, 10);
});
userSchema.methods;
