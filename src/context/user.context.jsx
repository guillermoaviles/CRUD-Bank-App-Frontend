import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

const UserContext = createContext();

function UserContextWrapper(props) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiURL = "http://localhost:8080/api/users/1";

  useEffect(() => {
    console.log("useEffect - Initial render (Mounting)");

    // Function to fetch user data
    const fetchUserData = () => {
      axios.get(apiURL).then((response) => {
        setUser(response.data);
        setIsLoading(false);
      });
    };

    // Fetch user data initially
    fetchUserData();

    // Set up an interval to fetch data every second
    const intervalId = setInterval(fetchUserData, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextWrapper };
