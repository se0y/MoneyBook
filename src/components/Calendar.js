// Calendar.js

import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['ko'] = {
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘'
  };
LocaleConfig.defaultLocale = 'ko';


const CalendarComponent = ({ selectedDate, onDateSelect }) => {

  const handleDayPress = (day) => {
    console.log(day);
    
    if (onDateSelect) {
      console.log('부모 컴포넌트로 날짜 전달:', day.dateString); // 2024-11-19 형식으로 전달
      onDateSelect(day.dateString);
    }
    console.log('선택된 날짜:', day.dateString); // 날짜 선택 시 로그 찍기
  };

  return (
      <Calendar
        style={{ borderRadius: 10, overflow: 'hidden' }}
        // 기본 현재 날짜
        current={new Date().toISOString().split('T')[0]}
        // 날짜 선택 시 호출
        onDayPress={handleDayPress}

        // 선택된 날짜 스타일 설정
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#337D69',    // 선택된 날짜의 배경색
            selectedTextColor: '#ffffff', // 선택된 날짜의 텍스트 색
            marked: true,
          }
        }}

        // 전체 캘린더 테마 설정
        theme={{
          calendarBackground: '#FFF7EA',    // 캘린더 배경색
          textSectionTitleColor: '#337D69', // 섹션 제목 색
          selectedDayBackgroundColor: '#337D69', // 선택된 날짜 배경색
          selectedDayTextColor: '#ffffff',  // 선택된 날짜 텍스트 색
          todayTextColor: '#337D69',        // 오늘 날짜 텍스트 색
          dayTextColor: '#2d4150',          // 일반 날짜 텍스트 색
          textDisabledColor: '#888',     // 비활성 날짜 텍스트 색
          arrowColor: '#337D69',            // 화살표 색
          monthTextColor: '#337D69',        // 월 텍스트 색
          textDayFontSize: 16,              // 날짜 폰트 크기
          textMonthFontSize: 18,            // 월 폰트 크기
        }}
      />
   
  );
}; 

const styles = StyleSheet.create({
  container: {
    padding: 16,
    
  },
});

export default CalendarComponent;