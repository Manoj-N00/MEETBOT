import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import NewRecording from './pages/NewRecording';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <main className="pt-16"> {/* Add padding to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new" element={<NewRecording />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;