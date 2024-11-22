// scr/screens/AgeCompare.js
// 연령대별 지출 비교 페이지

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import MonthPicker from 'react-native-month-year-picker'; // 연도와 월 선택 라이브러리
import InputField from '../components/ageCompare/InputField';
import WeeklyChart from '../components/common/CustomChart';
import AmountDetail from '../components/common/AmountDetail';
import styles from '../styles/ageCompare/ageCompareStyles';
import Header from '../components/common/Header';

const AgeCompare = () => {
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 초기값 null
  const [age, setAge] = useState(''); // 입력된 나이
  const [isCalendarVisible, setCalendarVisible] = useState(false); // 캘린더 표시 여부
  const [isConfirmed, setIsConfirmed] = useState(false); // 데이터 확인 여부
  const [chartData, setChartData] = useState([]); // 차트 데이터
  const [summaryData, setSummaryData] = useState({ myExpense: 0, peerExpense: 0 }); // 요약 데이터

  // 나이 유효성 검사
  const validateAge = (input) => {
    const parsedAge = parseInt(input, 10);
    return !isNaN(parsedAge) && parsedAge > 0 && parsedAge <= 120;
  };

  // 날짜 포맷팅 (2024-02 -> 2024년 2월)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}년 ${month}월`;
  };

  // 차트 데이터 예시
  const fetchChartData = () => [
    { label: '1주', income: 12000, expense: 8000 },
    { label: '2주', income: 4000, expense: 7000 },
    { label: '3주', income: 8000, expense: 1000 },
    { label: '4주', income: 10000, expense: 5000 },
  ];

  // 요약 데이터 예시
  const fetchSummaryData = () => ({
    myExpense: 230000,
    peerExpense: 200000,
  });

  // 확인 버튼 클릭 시
  const handleConfirmClick = () => {
    if (!selectedDate) {
      Alert.alert('입력 오류', '연도와 월을 선택하세요.');
      return;
    }

    if (!validateAge(age)) {
     Alert.alert('입력 오류', '나이를 올바르게 입력하세요.');
     return;
   }

    setChartData(fetchChartData());
    setSummaryData(fetchSummaryData());
    setIsConfirmed(true); // 데이터 확인 상태로 변경

    console.log("연령대별 지출 비교 선택 날짜: "+selectedDate);
    console.log("연령대별 지출 비교 내 나이: "+age);
  };

  // 캘린더에서 날짜 선택 완료 시
  const handleConfirmDate = (event, date) => {
    if (date) {
      setSelectedDate(date); // 선택된 날짜 저장
    }
    setCalendarVisible(false); // 캘린더 닫기
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <Header title="연령대별 지출 비교" />

      {/* 입력 및 결과 섹션 */}
      <View style={styles.roundedContainer}>
        <InputField
          label="연도, 월 선택"
          value={selectedDate ? formatDate(selectedDate) : ''} // 선택된 날짜가 없으면 빈 문자열
          placeholder="날짜를 선택하세요" // 플레이스홀더 추가
          onIconPress={() => setCalendarVisible(true)} // 아이콘 클릭 시 캘린더 열기
          isDate
        />
        <InputField
          label="내 나이"
          value={age}
          onChange={(text) => {
            if (text === '' || (!isNaN(text) && text.trim() !== '')) setAge(text); // 숫자만 입력 가능
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleConfirmClick}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>

        {/* 차트 및 요약 데이터 표시 */}
        {isConfirmed && chartData.length > 0 && (
          <>
            <View style={styles.chartWrapper}>
              <WeeklyChart chartData={chartData} space={20} />
            </View>
            <AmountDetail
              income={summaryData.myExpense}
              outcome={summaryData.peerExpense}
              isAgeCompare={true} // AgeCompare 페이지에서 사용
              incomeLabel="내 지출"
              expenseLabel="또래 지출"
            />
            <Text style={styles.note}>
              {`${formatDate(selectedDate)}은 또래보다 ${Math.abs(
                summaryData.myExpense - summaryData.peerExpense
              ).toLocaleString()}원 ${
                summaryData.myExpense > summaryData.peerExpense ? '더 사용했어요' : '덜 사용했어요'
              }`}
            </Text>
          </>
        )}
      </View>

      {/* 캘린더 선택 모달 */}
      {isCalendarVisible && (
        <MonthPicker
          onChange={handleConfirmDate} // 날짜 선택 완료
          value={selectedDate || new Date()} // 현재 선택된 날짜 또는 기본값
          minimumDate={new Date(2000, 0)} // 최소 선택 가능 날짜
          maximumDate={new Date()} // 최대 선택 가능 날짜
          locale="ko" // 한국어 설정
        />
      )}
    </View>
  );
};

export default AgeCompare;
