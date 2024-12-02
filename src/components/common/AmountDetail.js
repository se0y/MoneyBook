// src/components/common/AmountDetail
// 월별 통계 페이지, 연령대별 지출 비교 페이지 - 수입, 지출, 내 지출, 또래 지출

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IncomeIcon from '../../asset/income/IncomeColored.svg';
import ExpenseBrownIcon from '../../asset/expense/ExpenseBrown.svg';
import ExpenseIcon from '../../asset/expense/ExpenseColored.svg';
import CalendarSelector from '../monthlyStatics/CalendarSelector';
import IncomeOutcomeList from '../monthlyStatics/IncomeOutcomeList';
import styles from '../../styles/common/amountDetailStyles';

const AmountDetail = ({
  income,
  incomeChange,
  outcome,
  outcomeChange,
  isAgeCompare,
  incomeLabel = '수입',
  outcomeLabel = '지출',
  incomeList,
  outcomeList,
}) => {
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filteredIncomeList, setFilteredIncomeList] = useState([]);
  const [filteredOutcomeList, setFilteredOutcomeList] = useState([]);

  // 연도 또는 월이 변경될 때마다 데이터를 필터링
  useEffect(() => {
    if (isCalendarVisible) {
      const filteredIncome = incomeList.filter(
        (item) =>
          new Date(item.date).getFullYear() === selectedYear &&
          new Date(item.date).getMonth() + 1 === selectedMonth
      );

      const filteredOutcome = outcomeList.filter(
        (item) =>
          new Date(item.date).getFullYear() === selectedYear &&
          new Date(item.date).getMonth() + 1 === selectedMonth
      );

      setFilteredIncomeList(filteredIncome);
      setFilteredOutcomeList(filteredOutcome);
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
          style={[styles.compareItem, selectedType === 'outcome' && styles.blur]}
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
              <Text style={styles.compareChange}>
                {incomeChange > 0
                  ? `+${incomeChange?.toLocaleString()}`
                  : incomeChange < 0
                  ? `${incomeChange?.toLocaleString()}`
                  : '0'}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.compareItem, selectedType === 'income' && styles.blur]}
          onPress={!isAgeCompare ? () => showCalendar('outcome') : null} // isAgeCompare가 true이면 비활성화
          disabled={isAgeCompare} // isAgeCompare가 true이면 비활성화
        >
          <ExpenseIcon width={24} height={24} style={styles.icon} />
          <Text style={styles.compareLabel}>{outcomeLabel}</Text>
          <Text style={styles.expenseAmount}>{outcome.toLocaleString()}</Text>
          {!isAgeCompare && (
            <>
              <Text style={styles.compareChange}>지난 달 대비</Text>
              <Text style={styles.compareChange}>
                {outcomeChange > 0
                  ? `+${outcomeChange?.toLocaleString()}`
                  : outcomeChange < 0
                  ? `-${outcomeChange?.toLocaleString()}`
                  : '0'}
              </Text>
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
        <IncomeOutcomeList
          incomeList={selectedType === 'income' ? filteredIncomeList : []}
          outcomeList={selectedType === 'outcome' ? filteredOutcomeList : []}
          selectedType={selectedType}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
        />
      )}
    </View>
  );
};

export default AmountDetail;
