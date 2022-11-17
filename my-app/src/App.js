import logo from './logo.svg';
import './App.css';
import {Component, useState} from 'react';
import React from 'react';

function App() {

  // Hook: 
  // Declare a new state variable, which we'll call "transactions".
  // We are setting count as an empty array, []. There is an equivalent class example of this with a constructor.
  // useState: enables you to add a state for function components
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState("");

  function activateLasers(){
    fetch("http:localhost:8080/transactions")
      .then(res => res.json()) //synchronization
      .then(json => {setTransactions(json);}) 
      console.log("testing");
      
      // console.log("Addy has: " + transactions.Addy);
      <p>
        JSON.stringify(transactions);
      </p>
      console.log(JSON.stringify(transactions.Julia));
  }

  function postTransaction(event) {
    // read from the text box, then post as a transaction
    event.preventDefault();
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": name
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http:localhost:8080/transactions", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      
  }
/*
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
*/
  function handleNameChange(event){
      setName(event.target.value);
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

        {/* 
        - map() creates a new array from calling a function for every array event
        - ((transaction, i) => f): creates a function [f] with props [transaction] and [i].
        */}

        <form>
          <label>
            Name:
            <input type="text" name="name" onChange={handleNameChange}/>
          </label>
          <button onClick={postTransaction}> Post Transactions </button>
        </form>

        <text>
          Our name is: {name}
        </text>
        
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
