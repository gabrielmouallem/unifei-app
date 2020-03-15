import React from 'react';
import './App.css';
import Nav from './pages/DashBoard/components/Nav/Nav';
import Map from './pages/DashBoard/components/Map/Map';
import BottomTab from './pages/DashBoard/components/BottomTab/BottomTab';

function App() {
  return (
    <div className="App">
      <Nav />
      <Map />
      <BottomTab />
    </div>
  );
}

export default App;
