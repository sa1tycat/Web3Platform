import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiKeyContext = createContext(null);

export const useApiKey = () => useContext(ApiKeyContext);

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('http://142.171.199.52:3000/api-key');
        const data = await response.json();
        console.log("返回的值",data);
        setApiKey(data.apiKey);
      } catch (error) {
        console.error('Failed to fetch API key', error);
      }
    };

    fetchApiKey();
  }, []);

  return (
    <ApiKeyContext.Provider value={apiKey}>
      {children}
    </ApiKeyContext.Provider>
  );
};
