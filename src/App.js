import './App.css';
import lottery from './lottery';
import React, { useEffect, useState } from 'react';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadManager = async() => setManager(await lottery.methods.manager().call());

    const loadPlayers = async() => setPlayers(await lottery.methods.getPlayers().call());

    const loadBalance = async() => {
      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(web3.utils.fromWei(balance, 'ether'));
    };

    loadManager();
    loadPlayers();
    loadBalance();
  });

  const handleChange = (event) => setValue(event.target.value);

  const handleSubmit = async(event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();

    setMessage('Waiting on transaction success...');

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, 'ether')
    });

    setMessage('You have been entered!');
  };

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>There are currently {players.length} people entered, competing to win {balance} eth.</p>
      <hr />
      <form>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input value={value} onChange={handleChange} />
        </div>
        <button onClick={handleSubmit}>Enter</button>
      </form>
      <hr />
      <h4>{message}</h4>
    </div>
  );
}

export default App;
