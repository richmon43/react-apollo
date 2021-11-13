const { gql } = require('apollo-server');

// Schema
const typeDefs = gql`
  type User {
    id: ID
    nombre: String
    apellido: String
    email: String
    estado: String
    creado: String
  }
  type Token {
    token: String
  }
  type Project {
    id: ID
    titulo: String
    objGenerales: String
    presupuesto: Int
    dniLider: String
    nombreLider: String
    estado: String
    fase: String
    creado: String
    duracion: Int
  }

  input UserInput {
    nombre: String!
    apellido: String!
    estado: String
    email: String!
    password: String!
  }
  input AuthInput {
    email: String!
    password: String!
  }
  input ProjectInput {
    titulo: String!
    objGenerales: String
    presupuesto: Int
    dniLider: String!
    nombreLider: String!
    estado: String
    fase: String
    creado: String
    duracion: Int
  }

  type Query {
    # Users
    getUsers: [User]
    getUser(token: String!): User
    # Projects
    getProjects: [Project]
    getProject(id: ID!): Project
  }
  type Mutation {
    # Users
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token
    updateUser(id: ID!, input: UserInput): User
    deleteUser(id: ID!): String
    # Projects
    newProject(input: ProjectInput): Project
    updateProject(id: ID!, input: ProjectInput): Project
    deleteProject(id: ID!): String
  }
`;

module.exports = typeDefs;