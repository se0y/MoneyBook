// src/screens/MonthlyStatics.js
// 월별 통계 페이지

import React from 'react';
import { View, FlatList } from 'react-native';
import AmountSummary from '../components/monthlyStatics/AmountSummary';
import Header from '../components/common/Header';
import BudgetIndicator from '../components/monthlyStatics/BudgetIndicator';
import MonthlyChart from '../components/common/CustomChart';
import AmountDetail from '../components/common/AmountDetail';
import LineIcon from '../asset/MonthlyStaticsLine.svg';
import styles from '../styles/monthlyStatics/monthlyStaticsStyles';

const MonthlyStatics = () => {
  const chartData = [
    { label: '1월', income: 12000, expense: 8000 },
    { label: '2월', income: 4000, expense: 7000 },
    { label: '3월', income: 8000, expense: 1000 },
    { label: '4월', income: 10000, expense: 5000 },
    { label: '5월', income: 15000, expense: 12000 },
    { label: '6월', income: 2000, expense: 500 },
    { label: '7월', income: 12000, expense: 8000 },
    { label: '8월', income: 4000, expense: 7000 },
    { label: '9월', income: 8000, expense: 1000 },
    { label: '10월', income: 10000, expense: 5000 },
    { label: '11월', income: 15000, expense: 12000 },
    { label: '12월', income: 2000, expense: 500 },
  ];

  const sections = [
    {
      key: 'summary',
      component: (
        <View style={styles.summaryContainer}>
          <AmountSummary label="총 잔액" amount={2500000} isIncome={true} />
          <LineIcon height={47} style={styles.lineIcon} />
          <AmountSummary label="총 지출" amount={5000} isIncome={false} />
        </View>
      ),
    },
    {
      key: 'budget',
      component: <BudgetIndicator percentage={30} totalAmount={300000} />,
    },
    {
      key: 'chart',
      component: (
        <View style={styles.roundedContainer}>
          <MonthlyChart chartData={chartData} />
          <AmountDetail
            income={1600000}
            incomeChange={10000}
            expense={50000}
            expenseChange={60000}
          />
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="나의 월별 통계" /> {/* Header 수정 */}
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => item.component}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default MonthlyStatics;
