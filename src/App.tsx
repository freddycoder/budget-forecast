import { Simulation } from './features/simulation/Simulation';
import './App.css';
import { LiHref } from './components/LiHref.component';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ul>
            <LiHref 
              href="https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MC-CH-fra.aspx" 
              text="Calculatrice hypothécaire Canada"></LiHref>
            <LiHref 
              href="http://www.calculconversion.com/calcul-pret-hypothecaire.html#:~:text=Formule%20du%20pr%C3%AAt%20hypoth%C3%A9caire%20Le%20versement%20mensuel%20%3D,l%27ann%C3%A9e%29-Nombre%20de%20versements%20%2A%20Nombre%20d%27ann%C3%A9es%20du%20terme" 
              text="Comment calculer un prêt"></LiHref>
          </ul>
        </div>
      </header>
      <main className="App-main">
        <Simulation />
      </main>
    </div>
  );
}

export default App;
