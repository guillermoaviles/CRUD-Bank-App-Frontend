import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

function UserContextWrapper(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <UserContext.Provider value={{theme, toggleTheme}}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextWrapper };
