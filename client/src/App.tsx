import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import MainMenu from './components/MainMenu';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import { socket } from './lib/socket';

function App() {
  const [isPaired, setIsPaired] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className='flex flex-col justify-between h-[100vh]'>
      <Navbar />
      {isPaired ? (
        <Chat username={username} socket={socket} />
      ) : (
        <MainMenu
          socket={socket}
          setIsPaired={setIsPaired}
          username={username}
          setUsername={setUsername}
        />
      )}
      <Footer />
    </main>
  );
}

export default App;
