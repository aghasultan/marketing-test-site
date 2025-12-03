import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@components/Layout';
import { Home } from '@pages/Home';
import { Apply } from '@pages/Apply';
import { Scale } from '@pages/Scale';
import { BlogIndex } from '@pages/BlogIndex';
import { BlogPost } from '@pages/BlogPost';
import { NotFound } from '@pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/scale" element={<Scale />} />
          <Route path="/services" element={<Scale />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
