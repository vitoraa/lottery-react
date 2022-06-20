import './App.css';
import lottery from './lottery';
import React, { useEffect, useState } from 'react';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const loadManager = async() => {
      setManager(await lottery.methods.manager().call());
    };

    const loadPlayers = async() => {
      setPlayers(await lottery.methods.getPlayers().call());
    };

    const loadBalance = async() => {
      const balance = await web3.eth.getBalance(lottery.options.address);
      setBalance(web3.utils.fromWei(balance, 'ether'));
    };

    loadManager();
    loadPlayers();
    loadBalance();
  });

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by {manager}</p>
      <p>There are currently {players.length} people entered, competing to win {balance} eth</p>
    </div>
  );
}

export default App;
