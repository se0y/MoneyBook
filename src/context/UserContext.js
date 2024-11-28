import React, { createContext, useState } from 'react';

// UserContext 생성
export const UserContext = createContext();

// UserContext Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // userId 상태 저장

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
