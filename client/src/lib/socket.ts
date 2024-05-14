import { Manager } from 'socket.io-client';

const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3500';
const manager = new Manager(socketUrl);

export const socket = manager.socket('/'); // main namespace
