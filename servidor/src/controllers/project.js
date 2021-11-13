const Project = require("../models/Project");

async function getProjects(){
  try {
    const projects = await Project.find({});
    return projects;
  } catch (error) {
    console.log(error);
  }
}

async function getProject(id){
  // revisar si el producto existe
  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Project no encontrado");
  }
  return project;
}

async function newProject(input) {
  try {
    const project = new Project(input);
    // almacenar en la DB
    const result = await project.save();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function updateProject(id, input) {
  // Revisar si el project existe o no
  let project = await Project.findById(id);
  if (!project) {
    throw new Error("Proyecto no encontrado");
  }
  // guardarlo en la base de datos
  project = await Project.findOneAndUpdate({ _id: id }, input, {
    new: true,
  });
  return project;
}

async function deleteProject(id) {
  // Revisar si el project existe o no
  let project = await Project.findById(id);
  if (!project) {
    throw new Error("Proyecto no encontrado");
  }
  // Eliminarlo de la DB
  await Project.findByIdAndDelete({_id: id});
  return 'Proyecto eliminado correctamente';
}

module.exports = {
  // Query
  getProjects,
  getProject,
  // Resolvers
  newProject,
  updateProject,
  deleteProject,
}