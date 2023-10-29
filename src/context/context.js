import { createContext, useState } from "react";
import carData from "../assets/data/carData";

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [filterCarData, setFilterCarData] = useState(carData);

  return (
    <MyContext.Provider
      value={{
        filterCarData,
        setFilterCarData,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContextProvider, MyContext };
