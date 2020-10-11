import socketIo from 'socket.io-client';

const socket = socketIo('http://localhost:80');

export default socket;