import { Mortgage } from './features/mortgage/Mortgage';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Income } from './features/income/Income';
import { Outcome } from './features/outcome/Outcome';
import { RenderSimulation } from './features/finalSimulation/RenderSimulation';
import { NavBar } from './NavBar';

function App() {
  let baseName = '/budget-forecast';

  return (
    <>
      <BrowserRouter basename={baseName}>
        <div className="App">
          <header className="App-header">
            <NavBar></NavBar>
          </header>

          <main className="App-main">
            <article>
              <section>
                <Routes>
                  <Route path="/" element={<Mortgage></Mortgage>} />
                  <Route path="/hypotheque" element={<Mortgage></Mortgage>} />
                  <Route path="/revenue" element={<Income></Income>} />
                  <Route path="/depense" element={<Outcome></Outcome>} />
                  <Route path="/simulation" element={<RenderSimulation></RenderSimulation>} />
                </Routes>
              </section>
            </article>
          </main>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
