import Footer from './components/Footer';
import MainMenu from './components/MainMenu';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className='flex flex-col justify-between h-[100vh]'>
      <Navbar />
      <MainMenu />
      <Footer />
    </main>
  );
}

export default App;
