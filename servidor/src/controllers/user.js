const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

const crearToken = (user, secreta, expiresIn) => {
  // console.log(user);
  const { id, nombre, apellido, email, estado } = user;
  return jwt.sign({ id, nombre, apellido, email, estado }, secreta, {
    expiresIn,
  });
};

// Query
async function getUsers() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.log(error);
  }
}

async function getUser(token) {
  const userId = await jwt.verify(token, process.env.SECRETA);
  return userId;
}

// Resolvers
async function newUser(input) {
  // convertimos los datos de interes ingresados por el usuario a minusculas
  input.email = input.email.toLowerCase();
  // input.username = input.username.toLowerCase();

  const { email, password } = input;
  // revisar si el username ya existe
  // const existUserName = await User.findOne({ username });
  // if (existUserName) {
  //   throw new Error("El username ya esta en uso, intenta con otro");
  // }
  // Revisar si el usaurio ya esta registrado
  const existsUser = await User.findOne({ email });
  if (existsUser) {
    throw new Error("El user ya esta registrado");
  }
  // Encriptamos el pasword
  const salt = await bcrypt.genSaltSync(10);
  input.password = await bcrypt.hash(password, salt);
  try {
    // Guardarlo en la base de datos
    const user = new User(register);
    user.save(); // guardarlo en la DB
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function authUser(input) {
  const { email, password } = input;
  // Si el ususario existe
  const existsUser = await User.findOne({ email: email.toLowerCase() });
  if (!existsUser) {
    throw new Error("Error en el email o contraseña");
  }
  // Revisar si el prassword es correcto
  const passwordCorrect = await bcrypt.compare(password, existsUser.password);
  if (!passwordCorrect) {
    throw new Error("Error en el email o contraseña");
  }
  // Crear el token
  return {
    token: crearToken(existsUser, process.env.SECRETA, "12h"),
  };
}

async function updateUser(id, input) {
  // Revisar si el user existe
  let user = await User.findById(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  // guardarlo en la base de datos
  user = await User.findOneAndUpdate({ _id: id }, input, { new: true });
  return user;
}

async function deleteUser(id) {
  // Revisar si el user existe o no
  let user = await User.findById(id);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  // Eliminarlo de la DB
  await User.findByIdAndDelete({ _id: id });
  return "Usuario eliminado correctamente";
}

module.exports = {
  // Query
  getUsers,
  getUser,
  // Resolvers
  newUser,
  authUser,
  updateUser,
  deleteUser,
};