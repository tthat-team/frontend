import logo from './logo.svg';
import './App.css';
import {Component, useState} from 'react';
import React from 'react';

function App() {

  // create a state for transactions to display
  const [transactions, setTransactions] = useState([]);

  function activateLasers(){
    fetch("http:localhost:8080/transactions")
      .then(res => res.json()) //synchronization
      .then(json => {setTrasactions(json);}) //not defined
  }


  function showAllTransactions() {
    var component = <p></p>
    for (const transaction in transactions) {
      component = <p>
        {component}
        {JSON.stringify(transactions[transaction])}
      </p>
    }
    return Component;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          we are that team!!!
        </p>
        
        <button onClick={activateLasers}>
          Activate Lasers
        </button>

        <p> {transactions.map((transaction, i) => {
          if (transaction.hasOwnProperty('Julia')) {
            return (<p key={i}> Julia has: {JSON.stringify(transaction.Julia)}</p>)
          }
          return <p key={i}>{JSON.stringify(transaction)}</p>
        })}
        </p>

      </header>
    </div>
  );
  
}

export default App;
