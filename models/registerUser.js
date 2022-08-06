const mongoose = require('mongoose');

const registerSchema = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
};

const registerUser = mongoose.model('registerUser', registerSchema);

module.exports = registerUser;
