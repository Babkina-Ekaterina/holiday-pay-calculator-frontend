import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HolidayPayPage from './pages/HolidayPayPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<HolidayPayPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
