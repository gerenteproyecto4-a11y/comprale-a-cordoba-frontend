import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SellerDetailPage from './pages/SellerDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/seller/:id" element={<SellerDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
