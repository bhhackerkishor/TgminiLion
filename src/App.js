import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import TasksPage from './TasksPage/TasksPage';
import FrensPage from './FrensPage';
import EarnPage from './EarnPage/EarnPage';
import WalletPage from './WalletPage/WalletPage';
import BottomNavBar from './BottomNavBar';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/"  element={<HomePage/>} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/frens" element={<FrensPage/>} />
          <Route path="/earn" element={<EarnPage/>} />
          <Route path="/Wallet" element={<WalletPage/>} />
          
        </Routes>
        <BottomNavBar />
      </div>
    </Router>
  );
}

export default App;