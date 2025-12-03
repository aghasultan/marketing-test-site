import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Apply } from './pages/Apply';
import { Scale } from './pages/Scale';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/scale" element={<Scale />} />
          <Route path="/services" element={<Scale />} /> {/* Alias Services to Scale for now as per legacy links */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
