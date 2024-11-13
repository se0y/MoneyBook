// src/components/monthlyStatics/AmountSummary.js
// 월별 통게 페이지 - 수입, 지출 금액

import React from 'react';
import { View, Text } from 'react-native';
import IncomeIcon from '../../asset/income/Income.svg';
import ExpenseIcon from '../../asset/expense/Expense.svg';
import styles from '../../styles/monthlyStatics/amountSummaryStyles';

const AmountSummary = ({ label, amount = 0, isIncome }) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {isIncome ? ( // 수입
          <IncomeIcon width={16} height={16} style={styles.icon} />
        ) : ( // 지출
          <ExpenseIcon width={16} height={16} style={styles.icon} />
        )}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={[styles.amount, isIncome ? styles.income : styles.expand]}>
        {isIncome ? `${amount.toLocaleString()} 원` : `-${amount.toLocaleString()} 원`}
      </Text>
    </View>
  );
};

export default AmountSummary;
