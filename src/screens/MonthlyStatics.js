// src/screens/MonthlyStatics.js
import React from 'react';
import { View, FlatList } from 'react-native';
import AmountSummary from '../components/monthlyStatics/AmountSummary';
import MonthlyStaticsHeader from '../components/monthlyStatics/MonthlyStaticsHeader';
import BudgetIndicator from '../components/monthlyStatics/BudgetIndicator';
import MonthlyChart from '../components/monthlyStatics/MonthlyChart';
import AmountDetail from '../components/monthlyStatics/AmountDetail';
import styles from '../styles/monthlyStatics/monthlyStaticsStyles';

const MonthlyStatics = () => {
  // 데이터 배열을 만들어 FlatList로 렌더링할 컴포넌트들을 배열 요소로 정의합니다.
  const sections = [
    { key: 'header', component: <MonthlyStaticsHeader title="나의 월별 통계" /> },
    {
      // 월별 잔액, 지출 요약
      key: 'summary',
      component: (
        <View style={styles.summaryContainer}>
          <AmountSummary
            label="총 잔액"
            amount={2500000}
            isIncome={true}
          />
          <AmountSummary
            label="총 지출"
            amount={5000}
            isIncome={false}
          />
        </View>
      ),
    },
    {
      // 예산 사용 결과
      key: 'budget',
      component: <BudgetIndicator percentage={30} totalAmount={300000} />,
    },
    {
      // 수입, 지출 여부와 날짜에 따른 목록
      key: 'chart',
      component: (
        <View style={styles.roundedContainer}>
          <MonthlyChart />
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
    <FlatList
      data={sections}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => item.component}
      contentContainerStyle={styles.container} // styles.container 스타일 적용
    />
  );
};

export default MonthlyStatics;
