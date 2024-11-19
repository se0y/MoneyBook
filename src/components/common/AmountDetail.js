// src/components/common/AmountDetail
// 월별 통계 페이지, 연령대별 지출 비교 페이지 - 수입, 지출, 내 지출, 또래 지출

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IncomeIcon from '../../asset/income/IncomeColored.svg';
import ExpenseBrownIcon from '../../asset/expense/ExpenseBrown.svg';
import ExpenseIcon from '../../asset/expense/ExpenseColored.svg';
import CalendarSelector from '../monthlyStatics/CalendarSelector';
import IncomeExpenseList from '../monthlyStatics/IncomeExpenseList';
import styles from '../../styles/common/amountDetailStyles';

const AmountDetail = ({
  income,
  incomeChange,
  expense,
  expenseChange,
  isAgeCompare,
  incomeLabel = '수입',
  expenseLabel = '지출',
}) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filteredIncomeList, setFilteredIncomeList] = useState([]);
  const [filteredExpenseList, setFilteredExpenseList] = useState([]);

  // 예시 수입 및 지출 데이터
  const incomeList = [
    { id: 1, title: '초밥', amount: 1600000, date: '2024-11-24', time: '15:00', category: '식비' },
    { id: 2, title: '무신사', amount: 500000, date: '2024-10-15', time: '10:30', category: '쇼핑' },
    { id: 3, title: '투썸플레이스', amount: 500000, date: '2024-09-04', time: '09:15', category: '카페' },
    { id: 4, title: '맥도날드', amount: 5000, date: '2024-11-29', time: '17:00', category: '식비' },
  ];

  const expenseList = [
    { id: 1, title: 'CU', amount: 100000, date: '2024-08-20', time: '12:00', category: '편의점' },
    { id: 2, title: '미정', amount: 500000, date: '2024-07-01', time: '08:45', category: '이체' },
    { id: 3, title: '렌트', amount: 20000, date: '2024-06-01', time: '18:20', category: '기타' },
  ];

  // 연도 또는 월이 변경될 때마다 데이터를 필터링
  useEffect(() => {
    if (isCalendarVisible) {
      const filteredIncome = incomeList.filter(
        (item) =>
          new Date(item.date).getFullYear() === selectedYear &&
          new Date(item.date).getMonth() + 1 === selectedMonth
      );

      const filteredExpense = expenseList.filter(
        (item) =>
          new Date(item.date).getFullYear() === selectedYear &&
          new Date(item.date).getMonth() + 1 === selectedMonth
      );

      setFilteredIncomeList(filteredIncome);
      setFilteredExpenseList(filteredExpense);
    }
  }, [selectedYear, selectedMonth, isCalendarVisible]);

  const showCalendar = (type) => {
    setCalendarVisibility(true);
    setSelectedType(type);
  };

  return (
    <View>
      {/* 수입 및 지출 비교 섹션 */}
      <View style={styles.compareContainer}>
        <TouchableOpacity
          style={[styles.compareItem, selectedType === 'expense' && styles.blur]}
          onPress={!isAgeCompare ? () => showCalendar('income') : null} // isAgeCompare가 true이면 비활성화
          disabled={isAgeCompare} // isAgeCompare가 true이면 비활성화
        >
          {isAgeCompare ? (
            <ExpenseBrownIcon width={24} height={24} style={styles.icon} />
          ) : (
            <IncomeIcon width={24} height={24} style={styles.icon} />
          )}
          <Text style={styles.compareLabel}>{incomeLabel}</Text>
          <Text style={styles.incomeAmount}>{income.toLocaleString()}</Text>
          {!isAgeCompare && (
            <>
              <Text style={styles.compareChange}>지난 달 대비</Text>
              <Text style={styles.compareChange}>+{incomeChange?.toLocaleString()}</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.compareItem, selectedType === 'income' && styles.blur]}
          onPress={!isAgeCompare ? () => showCalendar('expense') : null} // isAgeCompare가 true이면 비활성화
          disabled={isAgeCompare} // isAgeCompare가 true이면 비활성화
        >
          <ExpenseIcon width={24} height={24} style={styles.icon} />
          <Text style={styles.compareLabel}>{expenseLabel}</Text>
          <Text style={styles.expenseAmount}>{expense.toLocaleString()}</Text>
          {!isAgeCompare && (
            <>
              <Text style={styles.compareChange}>지난 달 대비</Text>
              <Text style={styles.compareChange}>-{expenseChange?.toLocaleString()}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* 캘린더 선택기 */}
      {isCalendarVisible && (
        <CalendarSelector
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
        />
      )}

      {/* 선택한 월의 수입 또는 지출 목록 */}
      {isCalendarVisible && selectedType && (
        <IncomeExpenseList
          incomeList={selectedType === 'income' ? filteredIncomeList : []}
          expenseList={selectedType === 'expense' ? filteredExpenseList : []}
          selectedType={selectedType}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      )}
    </View>
  );
};

export default AmountDetail;
