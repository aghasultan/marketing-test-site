import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={
          <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
            <h1 className="text-4xl font-bold">Marketing Platform Migration</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
