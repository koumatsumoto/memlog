import React from 'react';
import './App.css';
import { ENV } from './environments';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          memlog<small>@{ENV.version}</small>
        </p>
      </header>
    </div>
  );
}

export default App;
