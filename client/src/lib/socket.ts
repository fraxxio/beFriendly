import { Manager } from 'socket.io-client';

const manager = new Manager('http://localhost:3500');

export const socket = manager.socket('/'); // main namespace
export const adminSocket = manager.socket('/admin'); // admin namespace
