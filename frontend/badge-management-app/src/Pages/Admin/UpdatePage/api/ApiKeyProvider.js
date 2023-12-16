import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiKeyContext = createContext(null);

export const useApiKey = () => useContext(ApiKeyContext);

export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await fetch('https://cc.wengjin.top/api-key');
        const data = await response.json();
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
