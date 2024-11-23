// src/components/monthlyStatics/BudgetProgressBar.js
// 월별 통게 페이지 - 예산 사용량 프로그레스바

import React from 'react';
import { View, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import styles from '../../styles/monthlyStatics/budgetProgressBarStyles';

const BudgetProgressBar = ({ percentage, outcome }) => (
  <View style={styles.progressBarContainer}>
    <ProgressBar
      progress={percentage / 100}
      width={null}
      height={40}
      color="#052224"
      unfilledColor="#FFF7EA"
      borderRadius={20}
      borderWidth={0}
      style={styles.progressBar}
    />
    <Text style={styles.percentageText}>{percentage}%</Text>
    <Text style={styles.totalAmountText}>{outcome.toLocaleString()} 원</Text>
  </View>
);

export default BudgetProgressBar;
