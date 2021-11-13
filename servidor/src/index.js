const { ApolloServer } = require('apollo-server');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const conectarDB = require('./config/db')

// Conectar a la DB
conectarDB();

// Servidor
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Arrancar el servidor
server.listen().then(({url}) => {
  console.log(`Servidor listo en la URL ${url}`);
})