import { Server, Socket } from 'socket.io';

// This function can be extended to include authentication middleware, room handling, etc.
export default function initSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    // Listen for incoming messages
    socket.on('sendMessage', (messageData) => {
      // Optionally add database saving logic here or call a service/GraphQL mutation.
      console.log('Received message:', messageData);
      // Broadcast the new message to all clients
      io.emit('newMessage', messageData);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}
