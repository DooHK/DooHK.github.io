// ✅ 2. src/App.js
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Page3 from './pages/page3';
import Request1 from './pages/request1';
import Request2 from './pages/request2';
import SubmitPage from './pages/requestPage';
import After1 from './pages/after1';
import After2 from './pages/after2';
import { FormProvider } from './contexts/FormContext';

export const SlideDirectionContext = createContext('down');

function AnimatedRoutes({ setDirection }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page1 setDirection={setDirection} />} />
        <Route path="/page2" element={<Page2 setDirection={setDirection} />} />
        <Route path="/page3" element={<Page3 setDirection={setDirection} />} />
        <Route path="/request1" element={<Request1 setDirection={setDirection} />} />
        <Route path="/request2" element={<Request2 setDirection={setDirection} />} />
        <Route path="/submit" element={<SubmitPage setDirection={setDirection} />} />
        <Route path="/after1" element={<After1 setDirection={setDirection} />} />
        <Route path="/after2" element={<After2 setDirection={setDirection} />} />

      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [direction, setDirection] = useState('down');

  return (
    <SlideDirectionContext.Provider value={direction}>
      <FormProvider>
        <Router>
          <AnimatedRoutes setDirection={setDirection} />
        </Router>
      </FormProvider>
    </SlideDirectionContext.Provider>
  );
}

export default App;
