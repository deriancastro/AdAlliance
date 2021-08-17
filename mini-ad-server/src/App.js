import './App.css';
import { useEffect, useState } from 'react'
import Position1 from './components/Position1';
import Position2 from './components/Position2';

function App() {
  const [dataPosition1, setdataPosition1] = useState([]);
  const [dataPosition2, setdataPosition2] = useState([]);
  const hour = 1;

  useEffect(() => {
    fetch('/ads1/' + hour)
    .then(res => res.json())
    .then(dataPosition1 => setdataPosition1(dataPosition1))
    .catch(error => console.log(error))
  }, []);

  useEffect(() => {
    fetch('/ads2' + hour)
    .then(res => res.json())
    .then(dataPosition2 => setdataPosition2(dataPosition2))
    .catch(error => console.log(error))
  }, []);

  console.log(dataPosition1);
  console.log(dataPosition2);

  
  return (
    <div className="App">
      <Position1 image={'https://box.adalliance.io/micha/gujtest/mr.png'} />
      <Position2 image={'https://box.adalliance.io/micha/gujtest/mr.png'} />
    </div>
  );
}

export default App;
