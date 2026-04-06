import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <header>
        {/* We will build a real Navbar component next! */}
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ddd' }}>
          <a href="/" className='text-2xl font-black uppercase tracking-tighter text-gray-900'>MY</a>
          <span className='text-blue-600 font-bold drop-shadow-black'>STORE</span>
        </nav>
      </header>
      
      <main style={{ padding: '2rem' }}>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;