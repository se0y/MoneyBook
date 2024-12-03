// src/context/BudgetOutcomeContext.js
import React, { createContext, useState } from 'react';

export const BudgetOutcomeContext = createContext();

export const BudgetOutcomeProvider = ({ children }) => {


  const updateBudgetAndOutcome = (newBudget, newOutcome) => {
    const positiveOutcome = Math.abs(newOutcome); // outcome을 양수로 변환
    const calculatedPercentage =
      newBudget === 0 ? 0 : Math.min((positiveOutcome / newBudget) * 100, 100);
    setBudget(newBudget);
    setOutcome(newOutcome);
    setPercentage(Number(calculatedPercentage.toFixed(2))); // 소수점 두 자리로 제한
  };

  return (
    <BudgetOutcomeContext.Provider
      value={{ budget, outcome, percentage, updateBudgetAndOutcome }}
    >
      {children}
    </BudgetOutcomeContext.Provider>
  );
};
