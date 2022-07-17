import React from 'react';
import logo from './logo.svg';
import { Simulation } from './features/simulation/Simulation';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ul>
            <li><a href="https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MC-CH-fra.aspx">Calculatrice hypothécaire Canada</a></li>
          </ul>
        </div>
      </header>
      <section>
        <Simulation />
      </section>
    </div>
  );
}

export default App;
