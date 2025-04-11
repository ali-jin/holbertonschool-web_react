import React from "react";

export const defaultUser = {
  isLoggedIn: false,
  email: '',
  password: '',
};

export const defaultLogOut = () => {
  console.log('Logging out...');
}

const AppContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export default AppContext;
