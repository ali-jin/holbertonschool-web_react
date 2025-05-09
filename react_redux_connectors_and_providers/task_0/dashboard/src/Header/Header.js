import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import logo from '../assets/holberton-logo.jpg';
import AppContext from '../App/AppContext';

class Header extends React.Component {
  static contextType = AppContext;

  handleLogout = () => {
    const { logOut } = this.context;
    logOut();  // Call the logOut function from the context
  };

  render() {
    const { user } = this.context; // Access the context value

    return (
      <header className={css(styles.header)}>
        <img className={css(styles.img)} src={logo} alt="logo" />
        <h1 className={css(styles.h1)}>School dashboard</h1>
        {user.isLoggedIn && (
          <section id="logoutSection">
            <p>Welcome {user.email} <a href="#" onClick={this.handleLogout}>Logout</a></p>
          </section>
        )}
      </header>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding: '6px',
    borderBottom: '4px solid #cf4550',
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    height: '240px',
  },
  h1: {
    padding: '10px',
    fontSize: '40px',
    color: '#cf4550',
  },
});

export default Header;
