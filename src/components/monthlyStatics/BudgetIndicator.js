// src/components/monthlyStatics/BudgetIndicator.js
// 월별 통게 페이지 - 예산 사용량 요약

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import BudgetProgressBar from './BudgetProgressBar';
import BudgetDescription from './BudgetDescription';
import styles from '../../styles/monthlyStatics/budgetIndicatorStyles';

const BudgetIndicator = ({ budget, outcome }) => {
  const [percentage, setPercentage] = useState(0); // 예산 대비 지출 퍼센트

  // 퍼센트 계산 함수
  const getOutComePercent = (budget, outcome) => {
    if (budget === 0) return 0; // 예산이 0인 경우 퍼센트를 0으로 설정
    return Math.min((outcome / budget) * 100, 100); // 최대 퍼센트는 100%로 제한
  };

  // 퍼센트 계산 및 상태 업데이트
  useEffect(() => {
    const percent = getOutComePercent(budget, outcome);
    setPercentage(percent);
  }, [budget, outcome]); // budget이나 outcome이 변경될 때마다 실행

  return (
    <View style={styles.budgetContainer}>
      <BudgetProgressBar percentage={percentage} budget={budget} outcome={outcome} />
      <BudgetDescription percentage={percentage} />
    </View>
  );
};

export default BudgetIndicator;
