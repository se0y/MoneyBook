// src/components/monthlyStatics/BudgetDescription.js
// 월별 통게 페이지 - 현재 예산 사용량

import React from 'react';
import { View, Text } from 'react-native';
import CheckIcon from '../../asset/Check.svg';
import styles from '../../styles/monthlyStatics/budgetDescriptionStyles';

const BudgetDescription = ({ percentage }) => (
  <View style={styles.budgetTextContainer}>
    <CheckIcon width={20} height={20} style={styles.checkIcon} />
    <Text style={styles.budgetText}>설정 예산의 {percentage}%를 사용하셨어요</Text>
  </View>
);

export default BudgetDescription;
