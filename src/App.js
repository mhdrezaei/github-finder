import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Navbar from './componnents/Navbar';
import Footer from './componnents/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import { GithubProvider } from './context/GithubContext';
import { AlertProvider } from './context/alert/AlertContext';
import User from './Pages/User';

function App() {
  return (
    <GithubProvider>
    <AlertProvider>
    <Router>
    <div className='flex flex-col justify-between h-screen'>
    <Navbar title='Github Finder '/>
    <main>
    <div className='container p-10 mx-auto'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/user/:login' element={<User />} />
        <Route path='/notfound' element={<NotFound />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </div>
    </main>
    <Footer />

    </div>
    
    </Router>
    </AlertProvider>
    </GithubProvider>
  );
}

export default App;
