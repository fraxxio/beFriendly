import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import MainMenu from './components/MainMenu';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import { socket } from './lib/socket';
import Questions from './components/Questions';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [isPaired, setIsPaired] = useState(false);
  const [isReadyToChat, setIsReadyToChat] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <main className='flex flex-col justify-between h-[100vh]'>
        <Navbar />
        {isPaired ? (
          isReadyToChat ? (
            <Chat username={username} socket={socket} />
          ) : (
            <Questions setIsReadyToChat={setIsReadyToChat} socket={socket} />
          )
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
    </QueryClientProvider>
  );
}

export default App;
