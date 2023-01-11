import logo from './logo.svg';
import './App.css';
import {Component, useState} from 'react';
import React from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
//import { MDBSelect } from 'mdb-react-ui-kit';

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

  const [currency, setCurrency] = useState("");

  //const Title1 = '------'
  
  //const Names = ['Adeline', 'Julia', 'Sherry'];

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

  function postCurrency(event) {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Currency": currency
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:8080/currency", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    setBalanceFlag(false);
    setTransactionFlag(false);
    setOptimizedTransfersFlag(false);

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

  function handleCurrencyChange(event){
    setCurrency(event.target.value);
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

  function handleSelectChange(event) {
    console.log("testing - on select");
    console.log(event.target.value);
    
  }

  // $('form-select').on('click',function() {
  //   alert($(this).val());
  //   console.log($(this).val());
  // });

  // createSelectItems(usersjson) {
  //   let items = [];         
  //   for (let i = 0; i <= this.props.maxValue; i++) {             
  //     items.push(usersjson[i]);   
  //     //items.push(<option key={i} value={i}>{i}</option>);   
  //        //here I will be creating my options dynamically based on
  //        //what props are currently passed to the parent component
  //   }
  //   return items;
  // }
  

  return (
    <div className="App">
      <header className="App-header">
        <p className="titleText">
          That Vacay!
        </p>

        

        {/* <Dropdown>
        <Dropdown.Toggle variant="success">
          Select a name
        </Dropdown.Toggle>
        <Dropdown.Menu onSelect={test}>
          <Dropdown.Item href="#">
            Home Page
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Settings
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}

      {/* <Form.Group controlId="formBasicSelect">
        <Form.Label>Select Norm Type</Form.Label>
        <Form.Control
          as="select"
          value={1}
          onChange={test}
        >
          <option value="DICTUM">Dictamen</option>
          <option value="CONSTANCY">Constancia</option>
          <option value="COMPLEMENT">Complemento</option>
        </Form.Control>
      </Form.Group> */}


      {/* <Dropdown>
        <Dropdown.Toggle variant="success" onSelect={test}>
          {Title1}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {users.map(x => (
            <Dropdown.Item >{x}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> */}

      {/* <MDBSelect
      data={[
        { text: 'One', value: 1 },
        { text: 'Two', value: 2 },
        { text: 'Three', value: 3 },
        { text: 'Four', value: 4 },
        { text: 'Five', value: 5 },
        { text: 'Six', value: 6 },
        { text: 'Seven', value: 7 },
        { text: 'Eight', value: 8 },
      ]}
    /> */}
        
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

        <select onChange={handleNameChange} class="form-select" aria-label="Default select example" >
          <option selected>[split a cost - name]</option>
            {users.map(x => (
              <option value={x}>{x}</option>
            ))}
        </select>

        <form>
          {/* <label className="bodyText">
            Name:
            <input
              type="text"
              name="name"
              onChange={handleNameChange}
              />
          </label> */}
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

        <select onChange={handleTransferFromChange} class="form-select" aria-label="Default select example" >
        <option selected>[transfer - from]</option>
        {users.map(x => (
            <option value={x}>{x}</option>
          ))}
      </select>

      <select onChange={handleTransferToChange} class="form-select" aria-label="Default select example" >
        <option selected>[transfer - to]</option>
        {users.map(x => (
            <option value={x}>{x}</option>
          ))}
      </select>

        <form>
          {/* <label className="bodyText">
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
          </label> */}
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

        <select onChange={handleCurrencyChange} class="form-select" aria-label="Default select example" >
          <option selected>Display Currencies in:</option>
            <option value='CAD'>CAD</option>
            <option value='USD'>USD</option>
            <option value='EUR'>EUR</option>
            <option value='CNY'>CNY</option>
            <option value='MXN'>MXN</option>
        </select>

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
