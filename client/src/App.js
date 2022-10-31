import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1>BoilerTutor</h1>

        <div className="form">
          <label>Tutor name:</label>
          <input type="text" name="tutor"/>

          <label>Subject:</label>
          <input type="text" name="subject"/>

          <button>Submit</button>
        </div>
    </div>
  );
}

export default App;
