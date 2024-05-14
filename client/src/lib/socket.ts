import { Manager } from 'socket.io-client';

const manager = new Manager('https://befriendly.onrender.com');

export const socket = manager.socket('/'); // main namespace
