import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login() {
  return (
    <div className={css(styles.body)}>
      <p>Login to access the full dashboard</p>
      <form className={css(styles.form)}>
        <div className={css(styles.block)}>
          <label className={css(styles.label)} htmlFor="email">Email:</label>
          <input className={css(styles.input)} type="email" id="email" name="email" />
        </div>
        <div className={css(styles.block)}>
          <label className={css(styles.label)} htmlFor="password">Password:</label>
          <input className={css(styles.input)} type="password" id="password" name="password" />
        </div>
        <button className={css(styles.button)} type="submit">OK</button>
      </form>
    </div>
  );
}

const styles = StyleSheet.create({
  body: {
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  button: {
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'white'
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    marginRight: '20px'
  },
  form: {
    display: 'inline-block',
    '@media (min-width: 900px)': {
      display: 'flex'
    }
  },
  label: {
    marginRight: '10px',
    fontWeight: 'bold'
  },
  input: {
    border: '1px solid #ccc',
    padding: '5px'
  }
});
export default Login;
