import { createContext, useEffect, useState } from "react";
import carData from "../assets/data/carData";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  // Car Data
  const [filterCarData, setFilterCarData] = useState(carData);

  // Journey Data State
  const [journeyData, setJourneyData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    address: "",
    pickup_date: "",
    pickup_time: "",
  });

  // Logged In User Data
  const [loggedInUser, setLoggedInUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  useEffect(() => {
    const loggedInUserData = JSON.parse(localStorage.getItem("user"));
    if (loggedInUserData) {
      setLoggedInUser(loggedInUserData);
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        filterCarData,
        setFilterCarData,
        journeyData,
        setJourneyData,
        loggedInUser,
        setLoggedInUser
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider, MyContext };
