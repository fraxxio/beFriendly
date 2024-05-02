import { useState } from 'react';
import Footer from './components/Footer';
import MainMenu from './components/MainMenu';
import Navbar from './components/Navbar';
import Chat from './components/Chat';

function App() {
  const [isPaired, setIsPaired] = useState(false);

  console.log('isPaired: ', isPaired);

  return (
    <main className='flex flex-col justify-between h-[100vh]'>
      <Navbar />
      {isPaired ? <Chat /> : <MainMenu setIsPaired={setIsPaired} />}
      <Footer />
    </main>
  );
}

export default App;
