// src/components/monthlyStatics/AmmountSummary.js
// 월별 통게 페이지 - 총 잔액( (설정 예산) – (총 지출) ), 총 지출

import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import IncomeIcon from '../../asset/income/Income.svg'; // 수입 아이콘 가져오기
import ExpenseIcon from '../../asset/expense/Expense.svg'; // 지출 아이콘 가져오기
import firestore from '@react-native-firebase/firestore'; // Firestore 연동
import styles from '../../styles/monthlyStatics/amountSummaryStyles'; // 스타일 가져오기

const AmountSummary = ({ label, isBudget, budget, outcome }) => {
  return (
    <View style={styles.container}>
      {/* 라벨과 아이콘 표시 */}
      <View style={styles.labelContainer}>
        {isBudget ? ( // `isBudget`이 true이면 수입 아이콘 표시
          <IncomeIcon width={16} height={16} style={styles.icon} />
        ) : ( // `isBudget`이 false이면 지출 아이콘 표시
          <ExpenseIcon width={16} height={16} style={styles.icon} />
        )}
        <Text style={styles.label}>{label}</Text> {/* 라벨 표시 */}
      </View>

      {/* 금액 표시 */}
      <Text
        style={[
          styles.amount,
          isBudget ? styles.income : styles.expand, // 수입/지출에 따라 스타일 적용
        ]}
      >
        {isBudget
          ? `${(budget+outcome).toLocaleString()} 원`
          : `${outcome.toLocaleString()} 원`}
      </Text>
    </View>
  );
};

export default AmountSummary;
