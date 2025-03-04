import React from 'react'
import logo from '../assets/holberton-logo.jpg'
import './App.css'
import { getFullYear, getFooterCopy } from '../utils/utils'

function App() {
  const isIndex = true
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </header>
      <div className="App-body">
        <p>Login to access the full dashboard</p>

        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <button type="submit">OK</button>
        </form>

      </div>
      <footer className="App-footer">
        <p>Copyright {getFullYear()} - {getFooterCopy(isIndex)}</p>
      </footer>
    </div >
  );
}

export default App;