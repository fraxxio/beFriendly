import { useEffect, useState } from 'react';
import { socket } from '../lib/socket';

export default function MainMenu() {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    socket.connect();

    socket.on('activeUsers', ({ users }: { users: number }) => {
      setUserCount(users);
    });

    return () => {
      socket.off('activeUsers');
      socket.disconnect();
    };
  }, []);

  return (
    <section className='h-[70vh] border-2 border-primary container'>
      <h1 className='text-center text-3xl font-semibold'>Find new friends!</h1>

      <p>People online: {userCount}</p>
    </section>
  );
}
