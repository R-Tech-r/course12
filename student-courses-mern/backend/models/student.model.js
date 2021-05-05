const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  student: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

}, {
  timestamps: true,
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;