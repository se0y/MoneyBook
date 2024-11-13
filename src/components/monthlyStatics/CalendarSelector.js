// src/components/monthlyStatics/CalendarSelector.js
// 월별 통게 페이지 - 커스텀 연도, 월 선태 캘린더

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/monthlyStatics/calendarSelectorStyles';

const CalendarSelector = ({ selectedYear, selectedMonth, setSelectedYear, setSelectedMonth }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.yearSelector}>
        <TouchableOpacity onPress={() => setSelectedYear(selectedYear - 1)} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.yearText}>{selectedYear}</Text>
        <TouchableOpacity onPress={() => setSelectedYear(selectedYear + 1)} style={styles.arrowButton}>
          <Text style={styles.arrowText}>{">"}</Text>
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
