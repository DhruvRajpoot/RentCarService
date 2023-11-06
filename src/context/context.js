import { createContext, useState } from "react";
import carData from "../assets/data/carData";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [filterCarData, setFilterCarData] = useState(carData);
  const [journeyData, setJourneyData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobilenumber: "",
    address: "",
    pickup_date: "",
    pickup_time: "",
  });

  return (
    <MyContext.Provider
      value={{
        filterCarData,
        setFilterCarData,
        journeyData,
        setJourneyData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider, MyContext };
