import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InteractiveBg } from './components/ui/InteractiveBg';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <InteractiveBg />
      <Routes>
        <Route path="/" element={
          <div className="flex h-screen items-center justify-center bg-transparent text-white relative z-10">
            <h1 className="text-4xl font-bold">Marketing Platform Migration</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
