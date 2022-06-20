import './App.css';
import lottery from './lottery';
import React, { useEffect, useState } from 'react';

function App() {
  const [manager, setManager] = useState('');

  useEffect(() => {
    async function loadManager() {
      setManager(await lottery.methods.manager().call());
    };
    loadManager();
  });

  return (
    <div>
      <h2>Lottery Contract</h2>
      <p>This contract is managed by ${manager}</p>
    </div>
  );
}

export default App;
