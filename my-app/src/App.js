import logo from './logo.svg';
import './App.css';
import {Component, useState} from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';

function App() {

  // Hook: 
  // Declare a new state variable, which we'll call "transactions".
  // We are setting count as an empty array, []. There is an equivalent class example of this with a constructor.
  // useState: enables you to add a state for function components
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState("");
  const [optimizedTrasfers, setOptimizedTransfers] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [nameSearch, setNameSearch] = useState("");
  const [newPerson, setNewPerson] = useState("");

  function activateLasers(){
    fetch("http://localhost:8080/transactions")
      .then(res => res.json()) //synchronization
      .then(json => {setTransactions(json);}) 
      console.log("testing - set transactions");
      
      // console.log("Addy has: " + transactions.Addy);
      <p>
        JSON.stringify(transactions);
      </p>
      console.log(JSON.stringify(transactions));
    fetch("http://localhost:8080/optimizedroutes")
       .then(res => res.json()) //synchronization
       .then(json => {setOptimizedTransfers(json);}) 
       console.log("testing - optimized transfers");
      
       // console.log("Addy has: " + transactions.Addy);
       <p>
         JSON.stringify(optimizedTransfers);
       </p>
       console.log(JSON.stringify(transactions));
  }

  function postTransaction(event) {
    // read from the text box, then post as a transaction
    event.preventDefault();
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "name": name,
      "amountPaid": amountPaid
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

  function postTransfer(event) {
    // read from the text box, then post as a transaction
    event.preventDefault();
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "from": from,
      "to": to,
      "amountTransferred": amountTransferred
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http:localhost:8080/transfers", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      
  }

  function postNewPerson(event) {
    event.preventDefault();
   
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "newPerson": newPerson
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

// HANDLE TRANSACTIONS
  function handleNameChange(event){
      setName(event.target.value);
  }

  function handleAmountPaidChange(event){
    setAmountPaid(event.target.value);
}

// HANDLE TRANSFERS
  function handleTransferFromChange(event){
    setTransferFrom(event.target.value);
  }

  function handleTransferToChange(event){
    setTransferTo(event.target.value);
  }

  function handleTransferAmountChange(event){
    setTransferAmount(event.target.value);
  }

  // HANDLE OPTIMIZATION
  function handleOptimizedChange(event){
    setNameSearch(event.target.value);
  }

  function handleNewPerson(event){
    setNewPerson(event.target.value); 
  }

  // i really don't think this would work but i put it here anyways
  function findOptimizedTransfer(event){
    transactions.map((transaction, i) => {
        if (transaction.hasOwnProperty(nameSearch)) {
          return (<p key={i}> {nameSearch} has: {JSON.stringify(optimizedTransfers.nameSearch)}</p>)
        }
        return <p key={i}>{JSON.stringify(optimizedTransfers)}</p>
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <p style = {{
          fontSize: 100,
        }
        }>
          That Vacay!
        </p>
        
        <Button variant="primary" onClick={activateLasers}>
          Activate Lasers
        </Button>

        {/* 
        - map() creates a new array from calling a function for every array event
        - ((transaction, i) => f): creates a function [f] with props [transaction] and [i].
        */}

        <form>
          <label>
            Add a person: 
            <input 
              type="text" 
              name="name"  // do i need to change this? 
              onChange={handleNewPerson}
              />
          </label>
          <Button onClick={postNewPerson}> Add </Button>
        </form>

        <p>
          Split a cost:
        </p>

        <form>
          <label>
            Name:
            <input 
              type="text" 
              name="name" 
              onChange={handleNameChange}
              />
          </label>
          <label>
            Paid:
            <input 
              type="text" 
              name="amountPaid" 
              onChange={handleAmountPaidChange}
              />
          </label>
          <Button onClick={postTransaction}> Post Transactions </Button>
        </form>

        <p>
          Record a transfer:
        </p>

        <form>
          <label>
            From:
            <input 
              type="text" 
              name="from" 
              onChange={handleTransferFromChange}
              />
          </label>
          <label>
            To:
            <input 
              type="text" 
              name="to" 
              onChange={handleTransferToChange}
              />
          </label>
          <label>
            Amount transferred:
            <input 
              type="text" 
              name="amountTransferred" 
              onChange={handleTransferAmountChange}
              />
          </label>
          <Button onClick={postTransfer}> Post Transfer </Button>
        </form>      
                

        <form>
          <label>
            Get optimized transfer for: 
            <input 
              type="text" 
              name="name" // do i need to change this? 
              onChange={handleOptimizedChange}
              />
          </label>
          <Button onClick={findOptimizedTransfer}> Find </Button>
        </form>  
      </header>
    </div>
  );
}

export default App;
