// src/components/monthlyStatics/AmountDetail.js
// 월별 통계 페이지 - 수입, 지출 목록

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IncomeIcon from '../../asset/income/IncomeColored.svg';
import ExpenseIcon from '../../asset/expense/ExpenseColored.svg';
import CalendarSelector from './CalendarSelector';
import IncomeExpenseList from './IncomeExpenseList';
import styles from '../../styles/monthlyStatics/amountDetailStyles';

const AmountDetail = ({ income, incomeChange, expense, expenseChange }) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false); // 캘린더 표시 여부 상태
  const [selectedType, setSelectedType] = useState(null); // 현재 선택된 타입 (수입/지출)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // 현재 연도
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 현재 월
  const [filteredIncomeList, setFilteredIncomeList] = useState([]); // 필터링된 수입 목록
  const [filteredExpenseList, setFilteredExpenseList] = useState([]); // 필터링된 지출 목록

  // 예시 수입 및 지출 데이터 (date와 time이 별도로 포함됨)
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

  // 연도 또는 월이 변경될 때마다 필터링된 수입 및 지출 데이터를 업데이트
  useEffect(() => {
    if (isCalendarVisible) {
      const filteredIncome = incomeList.filter(
        item =>
          new Date(item.date).getFullYear() === selectedYear &&
          new Date(item.date).getMonth() + 1 === selectedMonth
      );

      const filteredExpense = expenseList.filter(
        item =>
          new Date(item.date).getFullYear() === selectedYear &&
          new Date(item.date).getMonth() + 1 === selectedMonth
      );

      setFilteredIncomeList(filteredIncome);
      setFilteredExpenseList(filteredExpense);
    }
  }, [selectedYear, selectedMonth, isCalendarVisible]);

  // 캘린더를 보여주고 선택된 타입을 설정하는 함수
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
          onPress={() => showCalendar('income')}
        >
          <IncomeIcon width={24} height={24} style={styles.icon} />
          <Text style={styles.compareLabel}>수입</Text>
          <Text style={styles.incomeAmount}>{income.toLocaleString()}</Text>
          <Text style={styles.compareChange}>지난 달 대비</Text>
          <Text style={styles.compareChange}>+{incomeChange.toLocaleString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.compareItem, selectedType === 'income' && styles.blur]}
          onPress={() => showCalendar('expense')}
        >
          <ExpenseIcon width={24} height={24} style={styles.icon} />
          <Text style={styles.compareLabel}>지출</Text>
          <Text style={styles.expenseAmount}>{expense.toLocaleString()}</Text>
          <Text style={styles.compareChange}>지난 달 대비</Text>
          <Text style={styles.compareChange}>+{expenseChange.toLocaleString()}</Text>
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
