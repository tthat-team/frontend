import logo from './logo.svg';
import './App.css';
import {Component, useState} from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';
// import background from "./img/petals.png";

function App() {

  // Hook:
  // Declare a new state variable, which we'll call "spending".
  // We are setting count as an empty array, []. There is an equivalent class example of this with a constructor.
  // useState: enables you to add a state for function components
  const [transactions, setTransactions] = useState([]);
  const [balances, setBalances] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [optimizedTransfers, setOptimizedTransfers] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [nameSearch, setNameSearch] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [transferFrom, setTransferFrom] = useState("");
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState(0);
  const [userFlag, setUserFlag] = useState(false);
  const [transactionFlag, setTransactionFlag] = useState(false);
  const [balanceFlag, setBalanceFlag] = useState(false);
  const [optimizedTransfersFlag, setOptimizedTransfersFlag] = useState(false);


// POSTING

  // (postSpending) gives a single spending to the backend
  // name (payer name) amountPaid (to be split) -> [backend]

  function postSpending(event) {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Name": name,
      "Amount": amountPaid
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      //mode: 'no-cors'
    };

    fetch("http://localhost:8080/spendings", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setBalanceFlag(false);
    setTransactionFlag(false);
    setOptimizedTransfersFlag(false);
  }

  // (postTransfer) gives a single transfer to the backend
  // transferFrom (debitor) transferTo (creditor) transferAmount -> [backend]
  function postTransfer(event) {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "From": transferFrom,
      "To": transferTo,
      "Amount": transferAmount
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch("http://localhost:8080/transfers", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setBalanceFlag(false);
    setTransactionFlag(false);
    setOptimizedTransfersFlag(false);

  }

  // (postNewPerson) gives a single name to the backend (i.e. the new person)
  // newPerson -> [backend]
  function postNewPerson(event) {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Name": newPerson
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/users", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setUserFlag(false);
    setBalanceFlag(false);

  }


// HANDLING CHANGES

  // HANDLE: new person
  function handleNewPersonChange(event){
    setNewPerson(event.target.value);
  }

  // HANDLE: spending
  function handleNameChange(event){
    setName(event.target.value);
  }

  function handleAmountPaidChange(event){
    setAmountPaid(event.target.value);
}

// HANDLE: transfers
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

  //- map() creates a new array from calling a function for every array event
  //- ((transaction, i) => f): creates a function [f] with props [transaction] and [i].
  function showOptimizedTransfer(event){
    if (!optimizedTransfersFlag) {
      fetch("http://localhost:8080/optimizedroutes")
       .then(res => res.json()) //synchronization
       .then(json => {setOptimizedTransfers(json);})
       console.log("testing - optimized transfers");

      setOptimizedTransfersFlag(true);
    }

    return (<p className="bodyOutputText">
      {JSON.stringify(optimizedTransfers).replaceAll('"','').replaceAll('{','').replaceAll('}','').replaceAll(','," | ")}
      </p>)
  }

  function showAllTransactions() {
    if (!transactionFlag) {
      fetch("http://localhost:8080/transactions")
        .then(res => res.json()) //synchronization
        .then(json => {setTransactions(json);})
        console.log("testing - set transactions");
      setTransactionFlag(true);
    }

    var component = <p></p>
    for (const transaction in transactions) {
      component = <p className="bodyOutputText">
        {component}
        {JSON.stringify(transactions[transaction]).replaceAll('"','').replaceAll('{','').replaceAll('}','').replaceAll(','," | ")}
      </p>
    }
    return component;
  }

  function showBalances() {
    if (!balanceFlag) {
      fetch("http://localhost:8080/balances") // NOT SURE IF i can put fetch back to back.
        .then(res => res.json()) //synchronization
        .then(json => {setBalances(json);})
      console.log("testing - set balances");

      setBalanceFlag(true);
    }

    var component = <p></p>
    for (const balance in balances) {
      component = <p className="bodyOutputText">
        {component}
        {JSON.stringify(balances[balance]).replaceAll('"','').replaceAll('{','').replaceAll('}','').replaceAll(','," | ")}
      </p>
    }
    return component;
  }

  function showPeople() {

    if (!userFlag) {
      fetch("http://localhost:8080/users")
        .then(res => res.json()) //synchronization
        .then(json => {setUsers(json);})
      setUserFlag(true);
    }
      console.log("testing - set users");

    var component = <p></p>
    for (const user in users) {
      component = <p className="bodyOutputText">
        {component}
        {JSON.stringify(users[user]).replaceAll('"','').replaceAll('{','').replaceAll('}','').replaceAll(','," | ")}
      </p>
   }

    return component;
    //return Component;
  }

  return (
    <div className="App">
      <header className="App-header">
        <p className="titleText">
          That Vacay!
        </p>
        
        <p className="functionHeader">
          Add a Person:
        </p>

        <form>
          <label className="bodyText">
            Name:  
            <input
              type="text"
              name="name"  // do i need to change this?
              onChange={handleNewPersonChange}
              />
          </label>
          <Button onClick={postNewPerson}> Add </Button>
        </form>

        <p className="functionHeader">
          Split a cost:
        </p>

        <form>
          <label className="bodyText">
            Name:
            <input
              type="text"
              name="name"
              onChange={handleNameChange}
              />
          </label>
          <label className="bodyText">
            Paid:
            <input
              type="text"
              name="amountPaid"
              onChange={handleAmountPaidChange}
              />
          </label>
          <Button onClick={postSpending}> Post Spending </Button>
        </form>

        <p className="functionHeader">
          Record a transfer:
        </p>

        <form>
          <label className="bodyText">
            From:
            <input
              type="text"
              name="from"
              onChange={handleTransferFromChange}
              />
          </label>
          <label className="bodyText">
            To:
            <input
              type="text"
              name="to"
              onChange={handleTransferToChange}
              />
          </label>
          <label className="bodyText">
            Amount transferred:
            <input
              type="text"
              name="amountTransferred"
              onChange={handleTransferAmountChange}
              />
          </label>
          <Button onClick={postTransfer}> Post Transfer </Button>
        </form>

        <p className="bodyText">
          Transaction History:
          {showAllTransactions()}
        </p>

        <p className="bodyText">
          Optimized Transfer Routes:
          {showOptimizedTransfer()}
        </p>

        <p className="bodyText">
          Balances:
          {showBalances()}
        </p>

        <p className="bodyText">
          People:
          {/* {test()} */}
          {showPeople()}
        </p>

      </header>
    </div>
    
  );
  
}

export default App;
