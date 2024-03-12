import { jwtDecode } from 'jwt-decode';
import React, { useContext, createContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (jwtToken) => {
    try {
      // 使用jwtDecode来解析jwtToken
      const decoded = jwtDecode(jwtToken);
      // 假设JWT的payload直接包含了user的信息
      setUser({
        userID: decoded.userID,
        name: decoded.name,
        studentID: decoded.studentID,
        DID: decoded.DID,
        address: decoded.address
      });
    } catch (error) {
      console.error('解析JWT失败:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
