// src/components/monthlyStatics/BudgetIndicator.js
// 월별 통게 페이지 - 예산 사용량 요약

import React from 'react';
import { View } from 'react-native';
import BudgetProgressBar from './BudgetProgressBar';
import BudgetDescription from './BudgetDescription';
import styles from '../../styles/monthlyStatics/budgetIndicatorStyles';

const BudgetIndicator = ({ percentage, totalAmount }) => (
  <View style={styles.budgetContainer}>
    <BudgetProgressBar percentage={percentage} totalAmount={totalAmount} />
    <BudgetDescription percentage={percentage} />
  </View>
);

export default BudgetIndicator;
