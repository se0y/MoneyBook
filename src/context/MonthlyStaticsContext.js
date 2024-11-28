// src/context/MonthlyStaticsContext.js
// 월별 통계 데이터 전역 상태로 관리

// Firebase에서 데이터를 처음 조회한 뒤, 전역 상태에 저장
// 이후 월별 통계 페이지로 다시 돌아오면 전역 상태를 확인하여 데이터를 로드

import React, { createContext, useState, useContext } from "react";

// MonthlyStaticsContext 생성
// 데이터를 전역적으로 공유할 수 있도록 컨텍스트를 생성
const MonthlyStaticsContext = createContext();

// 컨텍스트의 프로바이더 정의
// 전역 상태를 제공할
export const MonthlyStaticsProvider = ({ children }) => {

  // 전역으로 관리될 상태 정의
  // 데이터를 캐싱하기 위해 초기값으로 설정된 상태를 사용
  const [cachedData, setCachedData] = useState({
    budget: 0, // 예산
    income: 0, // 현재 월 수입
    outcome: 0, // 현재 월 지출
    lastMonthIncome: 0, // 지난달 수입
    lastMonthOutcome: 0, // 지난달 지출
    chartData: [], // 차트에 표시될 월별 데이터
    incomeList: [], // 수입 상세 리스트
    outcomeList: [], // 지출 상세 리스트
  });

  // MonthlyStaticsContext.Provider를 통해 상태와 상태 업데이트 함수를 자식 컴포넌트에 제공
  return (
    <MonthlyStaticsContext.Provider value={{ cachedData, setCachedData }}>
      {children}
    </MonthlyStaticsContext.Provider>
  );
};

// 컨텍스트를 쉽게 사용할 수 있도록 커스텀 훅 정의
// 컨텍스트 값을 반환하며, 이를 통해 전역 상태에 접근하거나 업데이트할 수 있음
// useContext 라는 Hook을 사용하여 Context에 넣은 값에 바로 접근
export const useMonthlyStatics = () => useContext(MonthlyStaticsContext);
