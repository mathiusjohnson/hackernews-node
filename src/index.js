// @ts-check
const { PrismaClient } = require('@prisma/client')
const { GraphQLServer, PubSub } = require('graphql-yoga');

const { getUserId } = require('./utils');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote')

const typeDefs = require('./typeDefs');
const jwt = require('jsonwebtoken');


const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
}

const pubsub = new PubSub();
const prisma = new PrismaClient()

// const authenticate = async (resolve, root, args, context, info) => {
//   console.log('context: ', context.request.headers);

//   let token;
//   try {
//       token = jwt.verify(context.request.get("Authorization"), "secret");
//   } catch (e) {
//       return new Error("Not authorised");
//   }
//   const result = await resolve(root, args, context, info);
//   return result;
// };

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: req => ({
    ...req, 
    prisma, 
    pubsub, 
    // userId: req && req.headers.authorization
    // ? getUserId(req)
    // : null
  }),
  // middlewares: [authenticate]
});

const options = {
  port: 4000
};
server.start(options, ({ port }) => {
  console.log(
    `Graphql Server started, listening on port ${port} for incoming requests.`,
  )
})
