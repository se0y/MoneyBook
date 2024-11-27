// src/components/monthlyStatics/CalendarSelector.js
// 월별 통게 페이지 - 커스텀 연도, 월 선태 캘린더

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/monthlyStatics/calendarSelectorStyles';

const CalendarSelector = ({ selectedYear, selectedMonth, setSelectedYear, setSelectedMonth }) => {
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const currentYear = new Date().getFullYear(); // 현재 연도 가져오기

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.yearSelector}>
        <TouchableOpacity
          onPress={() => setSelectedYear(selectedYear - 1)}
          style={[styles.arrowButton, selectedYear <= 1 && styles.disabledArrow]} // 최소 연도 제한
          disabled={selectedYear <= 1} // 최소 연도 도달 시 비활성화
        >
          <Text
            style={[
              styles.arrowText,
              selectedYear <= 1 && styles.disabledArrowText, // 최소 연도 색상 스타일
            ]}
          >
            {"<"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.yearText}>{selectedYear}</Text>
        <TouchableOpacity
          onPress={() => {
            if (selectedYear < currentYear) setSelectedYear(selectedYear + 1); // 현재 연도까지만 증가 가능
          }}
          style={[styles.arrowButton, selectedYear >= currentYear && styles.disabledArrow]} // 최대 연도 제한
          disabled={selectedYear >= currentYear} // 현재 연도 초과 시 비활성화
        >
          <Text
            style={[
              styles.arrowText,
              selectedYear >= currentYear && styles.disabledArrowText, // 최대 연도 색상 스타일
            ]}
          >
            {">"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.monthGrid}>
        {months.map((month, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedMonth(index + 1)}
            style={[styles.monthItem, selectedMonth === index + 1 && styles.selectedMonth]}
          >
            <Text style={[styles.monthText, selectedMonth === index + 1 && styles.selectedMonthText]}>
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default CalendarSelector;

