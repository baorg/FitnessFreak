import { useState, createContext } from 'react';

const NavContext = createContext([ null, ()=>{}]);

const NavProvider = (props) => {
  const [leftNav, setLeftNav] = useState(false);
  return (
    <NavContext.Provider value={{leftnav: [leftNav, setLeftNav]}}>
      {props.children}
    </NavContext.Provider>
  );
};

export { NavContext, NavProvider };