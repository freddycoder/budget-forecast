import { Simulation } from './features/simulation/Simulation';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ul>
            <li><a href="https://itools-ioutils.fcac-acfc.gc.ca/MC-CH/MC-CH-fra.aspx">Calculatrice hypothécaire Canada</a></li>
            <li><a href="http://www.calculconversion.com/calcul-pret-hypothecaire.html#:~:text=Formule%20du%20pr%C3%AAt%20hypoth%C3%A9caire%20Le%20versement%20mensuel%20%3D,l%27ann%C3%A9e%29-Nombre%20de%20versements%20%2A%20Nombre%20d%27ann%C3%A9es%20du%20terme">Comment calculer un prêt</a></li>
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
