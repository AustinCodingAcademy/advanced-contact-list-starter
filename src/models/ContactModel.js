import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },

  occupation: {
    required: true,
    type: String
  },

  avatar: {
    required: true,
    type: String
  },
});

module.exports = mongoose.model('Contact', contactSchema);
