import { useState } from "react";
import { createContext } from "react";

const UserContext = createContext();

function UserContextWrapper(props) {
  const [user, setUser] = useState({});
  const [fetching, setFetching] = useState(true);

  const apiURL = "http://localhost:8080/api/users";

  useEffect(() => {
    console.log("useEffect - Initial render (Mounting)");
    axios.get(apiURL).then((response) => {
      setUser(response.data);
      setFetching(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextWrapper };
