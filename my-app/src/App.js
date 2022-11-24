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
  // I don't need to set state for spending
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


// FETCHING

  // (activeLasers) gets transactions and optimized routes from backend.
  // in actuality, we should trigger 'fetch transactions' on the 'see all transactions' button
  // function activateLasers(){
  //   {/* move fetch transactions into 'see all transactions' or whatever i name it. */}
  //   fetch("http://localhost:8080/transactions")
  //     .then(res => res.json()) //synchronization
  //     .then(json => {setTransactions(json);})
  //     console.log("testing - set transactions");

  //     // console.log("Addy has: " + transactions.Addy);
  //     <p>
  //       JSON.stringify(transactions);
  //     </p>
  //     console.log(JSON.stringify(transactions));

  //   {/* this belongs here*/}
  //   fetch("http://localhost:8080/optimizedroutes")
  //      .then(res => res.json()) //synchronization
  //      .then(json => {setOptimizedTransfers(json);})
  //      console.log("testing - optimized transfers");

  //      // console.log("Addy has: " + transactions.Addy);
  //      <p>
  //        JSON.stringify(optimizedTransfers);
  //      </p>
  //      console.log(JSON.stringify(transactions));
  // }

// POSTING

  // (postSpending) gives a single spending to the backend
  // name (payer name) amountPaid (to be split) -> [backend]
  function postSpending(event) {
    // read from the text box, then post as a spending
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
  }

  // (postTransfer) gives a single transfer to the backend
  // transferFrom (debitor) transferTo (creditor) transferAmount -> [backend]
  function postTransfer(event) {
    // read from the text box, then post as a transaction
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
      mode: 'no-cors'
    };

    fetch("http://localhost:8080/transfers", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

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
    fetch("http://localhost:8080/optimizedroutes") // NOT SURE IF i can put fetch back to back.
       .then(res => res.json()) //synchronization
       .then(json => {setOptimizedTransfers(json);})
       console.log("testing - optimized transfers");

       // console.log("Addy has: " + transactions.Addy);
       <p>
         JSON.stringify(optimizedTransfers);
       </p>
       //console.log(JSON.stringify(transactions));

    return (<p>JSON.stringify(optimizedTransfers)</p>)

    // transfers.map((transfer, i) => {
    //     if (transfer.hasOwnProperty(nameSearch)) {
    //       return (<p key={i}> {nameSearch} has: {JSON.stringify(optimizedTransfers.nameSearch)}</p>)
    //     }
    //     return <p key={i}>{JSON.stringify(optimizedTransfers)}</p>
    //   })
  }

  // what is this ???
  function showAllTransactions() {
    fetch("http://localhost:8080/transactions") // NOT SURE IF i can put fetch back to back.
      .then(res => res.json()) //synchronization
      .then(json => {setTransactions(json);})
      console.log("testing - set transactions");

      // // console.log("Addy has: " + transactions.Addy);
      // <p>
      //   JSON.stringify(transactions);
      // </p>
      // console.log(JSON.stringify(transactions));

    var component = <p></p>
    for (const transaction in transactions) {
      component = <p>
        {component}
        {JSON.stringify(transactions[transaction])}
      </p>
    }
    return component;
  }

  function showBalances() {
    fetch("http://localhost:8080/balances") // NOT SURE IF i can put fetch back to back.
      .then(res => res.json()) //synchronization
      .then(json => {setBalances(json);})
      console.log("testing - set balances");

    var component = <p></p>
    for (const balance in balances) {
      component = <p>
        {component}
        {JSON.stringify(balances[balance])}
      </p>
    }
    return Component;
  }

  function showPeople() {

    fetch("http://localhost:8080/users")
      .then(res => res.json()) //synchronization
      .then(json => {setUsers(json);})

      console.log("testing - set users");
      //var component = <p> {JSON.stringify(users)}</p>
    var component = <p></p>
    // for (let i = 0; i < users.length; i++) {
    //     component = <p>
    //       {component}
    //       {JSON.stringify(users[i])}
    //     </p>
    // }
    for (const user in users) {
      component = <p>
        {component}
        {JSON.stringify(users[user])}
      </p>
   }

    return component;
    //return Component;
  }

  function test() {
     var test = <p>this is a test</p>

     return test;
   }

  return (
    <div className="App">
      <header className="App-header">
        <p className="titleText">
          That Vacay!
        </p>

        {/* <Button variant="primary" onClick={activateLasers}>
          Activate Lasers
        </Button> */}
        
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

        <p>
          Transaction History:
          {showAllTransactions()}
        </p>

        <p>
          Optimized Transfer Routes:
          {showOptimizedTransfer}
        </p>

        <p>
          Balances:
          {showBalances}
        </p>

        <p>
          People:
          {/* {test()} */}
          {showPeople()}
        </p>

        {/* <Button variant="primary" onClick={showPeople}>
          Show People
        </Button> */}


        {/* <form>
          <label className="bodyText">
            Get optimized transfer for:
            <input
              type="text"
              name="name" // do i need to change this?
              onChange={handleOptimizedChange}
              />
          </label>
          <Button onClick={showOptimizedTransfer}> Find </Button>
        </form> */}

        {/* <Button variant="primary" onClick={showAllTransactions}>
          See Transaction History
        </Button> */}

      </header>
    </div>
    
  );

  // return (
  //   <div style={{ backgroundImage: `url(${background})` }}>
  //     Hello World
  //   </div>
  // );
  
}

export default App;
