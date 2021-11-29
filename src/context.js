import React, { useContext, useState,useEffect } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [cocktails, setCocktails] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${url}${searchTerm}`);
      const data = await res.json();
      const { drinks } = data;

      if (drinks) {
           const newData = drinks.map((item) => {
                 const {
                   idDrink,
                   strDrink,
                   strDrinkThumb,
                   strAlcoholic,
                   strGlass,
                 } = item;
             return {
               id: idDrink,
               name: strDrink,
               image: strDrinkThumb,
               info: strAlcoholic,
               glass: strGlass,
             };
            });
            setCocktails(newData)
      }else{
        setCocktails([]);
      }
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);
  return (
    <AppContext.Provider value={{loading, cocktails, setSearchTerm}}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
