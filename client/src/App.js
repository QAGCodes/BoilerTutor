import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [tutor, setTutor] = useState("")
  const [subject, setSubject] = useState("")

  const addTutor = () => {
    Axios.post('http://localhost:3001/test', {
      tutor: tutor,
      subject: subject,   
    })
    .then(() => {
      console.log('success')
    });
  }

  return (
    <div className="App">
        <h1>BoilerTutor</h1>

        <div className="form">
          <label>Tutor name:</label>
          <input type="text" name="tutor" onChange={(event) => setTutor(event.target.value)}/>

          <label>Subject:</label>
          <input type="text" name="subject" onChange={(event) => setSubject(event.target.value)}/>

          <button onClick={addTutor}>Submit</button>
        </div>
    </div>
  );
}

export default App;
