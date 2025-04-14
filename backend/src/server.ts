import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { Server as SocketIOServer } from 'socket.io';
import typeDefs from './schema/typeDefs';
import resolvers from './resolvers/messageResolver';
import initSocket from './socket';

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app';

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');

    const app = express() as any;;

    // Set up ApolloServer for GraphQL
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: '/graphql' });

    // Create HTTP server and bind Socket.IO
    const server = http.createServer(app);
    const io = new SocketIOServer(server, {
      cors: { origin: '*' }, // Configure CORS appropriately in production
    });

    // Initialize Socket.IO events
    initSocket(io);

    server.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`)
    );
  } catch (error) {
    console.error('Error starting the server:', error);
  }
})();
