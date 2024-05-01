import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className='text-center text-3xl flex flex-col justify-between h-[100vh]'>
      <Navbar />
      <h1>Hello</h1>
      <Footer />
    </main>
  );
}

export default App;
