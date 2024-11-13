// src/components/monthlyStatics/MonthlyStaticsHeader.js
// 월별 통게 페이지 - 헤더

import React from 'react';
import { Text } from 'react-native';
import styles from '../../styles/monthlyStatics/monthlyStaticsHeaderStyles';

const MonthlyStaticsHeader = ({ title }) => {
  return <Text style={styles.headerTitle}>{title}</Text>;
};

export default MonthlyStaticsHeader;
