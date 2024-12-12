import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Tasks from './components/Tasks';
import { DarkModeProvider } from './components/DarkModeContext';
import './Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [sidebarClosed, setSidebarClosed] = useState(false);
  const handleSidebarToggle = () => {
    setSidebarClosed(prevState => !prevState);
  };

  return (
    <DarkModeProvider>
      <div className="App">
        <Sidebar sidebarClosed={sidebarClosed} />
        <Routes>
          <Route path="/" element={<Tasks handleSidebarToggle={handleSidebarToggle} />} />
        </Routes>
      </div>
    </DarkModeProvider>
  );
}

export default App;
