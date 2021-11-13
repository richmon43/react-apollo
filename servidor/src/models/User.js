const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  estado: {
    type: String,
    required: true,
    default: "Pendiente"
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  creado: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', UserSchema);