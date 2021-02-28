import { useState, createContext } from 'react';

const UserContext = createContext([ null, ()=>{}]);

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={[ user, setUser ]}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };