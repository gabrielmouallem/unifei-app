import React from 'react';
import './App.css';
import AppProviders from './components/AppProviders/AppProviders';
import BaseRouter from './routes/BaseRouter/BaseRouter';

function App() {
  return (
    <div className="App">
      <AppProviders>
        <BaseRouter />
      </AppProviders>
    </div>
  );
}

export default App;
