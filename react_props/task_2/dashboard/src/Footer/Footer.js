import React from 'react'
import './Footer.css'
import { getFullYear, getFooterCopy } from '../utils/utils'

function Footer() {
  const isIndex = true
  return (
    <footer className="App-footer">
      <p>Copyright {getFullYear()} - {getFooterCopy(isIndex)}</p>
    </footer>
  );
};

export default Footer;
