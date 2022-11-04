import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {

  // create a state for transactions to display
  const [transactions, setTransactions] = useState([]);

  function activateLasers(){
    fetch("http:localhost:8080/transactions")
      .then(res => res.json()) //synchronization
      .then(json => {setTrasactions(json);})
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={activateLasers}>
          Activate Lasers
        </button>

        <p>
          we are that team!!!
        </p>

        <p> {transactions.map((transaction, i) => {
          if (transaction.hasOwnProperty('Julia')) {
            return (<p key={i}> Julia has: {SON.stringify(transaction.Julia)}</p>)
          }
          return <p key={i}>{JSON.stringify(transaction)}</p>
        })}
        </p>

      </header>
    </div>
  );
}

export default App;
