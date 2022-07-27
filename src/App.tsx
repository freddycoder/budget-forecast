import { Simulation } from './features/mortgage/Simulation';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Income } from './features/income/Income';
import { Outcome } from './features/outcome/Outcome';
import { RenderSimulation } from './features/finalSimulation/RenderSimulation';
import { NavBar } from './NavBar';

function App() {
  let baseName = undefined;

  if (window.location.host.includes('github.io')) {
    baseName = '/buget-forecast';
  }

  return (
    <BrowserRouter basename={baseName}>
      <div className="App">
        <header className="App-header">
          <NavBar></NavBar>
        </header>

        <main className="App-main">
          <article>
            <section>
              <Routes>
                <Route path="/" element={<Simulation></Simulation>} />
                <Route path="/hypotheque" element={<Simulation></Simulation>} />
                <Route path="/revenue" element={<Income></Income>} />
                <Route path="/depense" element={<Outcome></Outcome>} />
                <Route path="/simulation" element={<RenderSimulation></RenderSimulation>} />
              </Routes>
            </section>
          </article>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
