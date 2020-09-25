import React from 'react';
import './App.scss';
import AppProviders from './components/AppProviders/AppProviders';
import BaseRouter from './routes/BaseRouter/BaseRouter';

//

function App() {
  return (
    <AppProviders>
      <BaseRouter />
    </AppProviders>
  );
}

export default App;
