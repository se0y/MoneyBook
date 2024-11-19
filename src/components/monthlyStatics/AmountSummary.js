// src/components/common/AmountSummary.js
// 월별 통계 페이지 - 총 잔액, 총 진출

import React from 'react';
import { View, Text } from 'react-native';
import IncomeIcon from '../../asset/income/Income.svg';
import ExpenseIcon from '../../asset/expense/Expense.svg'; // 지출 아이콘 가져오기
import styles from '../../styles/monthlyStatics/amountSummaryStyles';

const AmountSummary = ({ label, amount = 0, isIncome }) => {
  return (
    <View style={styles.container}>
      {/* 라벨 및 아이콘 */}
      <View style={styles.labelContainer}>
        {isIncome ? ( // 수입 아이콘
          <IncomeIcon width={16} height={16} style={styles.icon} />
        ) : ( // 지출 아이콘
          <ExpenseIcon width={16} height={16} style={styles.icon} />
        )}
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* 금액 표시 */}
      <Text
        style={[
          styles.amount,
          isIncome ? styles.income : styles.expand, // 스타일 적용
        ]}
      >
        {isIncome
          ? `${amount.toLocaleString()} 원`
          : `-${amount.toLocaleString()} 원`}
      </Text>
    </View>
  );
};

export default AmountSummary;
