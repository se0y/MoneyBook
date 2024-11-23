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
import firestore from '@react-native-firebase/firestore';

const AgeCompare = () => {
  const uid = "2"; // 테스트 uid

  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 초기값 null
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [age, setAge] = useState(''); // 입력된 나이
  const [isCalendarVisible, setCalendarVisible] = useState(false); // 캘린더 표시 여부
  const [isConfirmed, setIsConfirmed] = useState(false); // 데이터 확인 여부
  const [chartData, setChartData] = useState([]); // 차트 데이터
  const [myOutcome, setMyOutcome] = useState(0); // 내지출
  const [peerOutcome, setPeerOutcome] = useState(0); // 또래지출

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

  // 캘린더에서 날짜 선택 완료 시
  const handleConfirmDate = (event, date) => {
    if (date) {
      setSelectedDate(date); // 선택된 날짜 저장
      setYear(date.getFullYear()); // 연도 저장
      setMonth(date.getMonth() + 1); // 월 저장
    }
    setCalendarVisible(false); // 캘린더 닫기
  };

  // 사용자가 설정한 연도, 월의 주차별 수입, 지출 차트 데이터 조회
  const fetchChartData = async (uid) => {
    try {
      // Firestore 참조
      const weeksRef = firestore()
        .collection('WeekAmount')
        .doc(uid)
        .collection('Year')
        .doc(year.toString())
        .collection('Month')
        .doc(month.toString())
        .collection('Weeks');

      // Firestore에서 문서 ID를 기준으로 주차 데이터 가져오기
      const weekDocNumbers = ['1', '2', '3', '4']; // 주차 번호를 문자열로 명시
      const weekPromises = weekDocNumbers.map((weekNumber) => weeksRef.doc(weekNumber).get());

      const weekSnapshots = await Promise.all(weekPromises);

      // 주차별 데이터를 매핑하면서 총 지출 (totalOutcome) 계산
      let totalOutcome = 0;

      const weekData = weekSnapshots.map((snapshot, index) => {
        if (snapshot.exists) {
          const { income = 0, outcome = 0 } = snapshot.data();
          totalOutcome += outcome; // 총 지출 계산
          return {
            label: `${weekDocNumbers[index]}주`, // 주차 번호 사용
            income,
            expense: outcome,
          };
        }
        return {
          label: `${weekDocNumbers[index]}주`,
          income: 0,
          expense: 0,
        };
      });

      // 차트 데이터 상태 업데이트
      setChartData(weekData);
      setMyOutcome(totalOutcome);

      console.log('Fetched Chart Data:', weekData);

      return weekData; // 최종 데이터 반환
    } catch (error) {
      console.error('Error fetching weekly chart data:', error);
      return [];
    }
  };

  // 또래 지출 조회
  const fetchPeerOutcome = async (age) => {
    try {
      // age를 기준으로 또래 나이 그룹 계산
      const peerAge = age < 10 ? 0 : parseInt(age.toString()[0] + '0', 10);

      console.log('Peer Age Group:', peerAge);

      // Firestore 참조
      const peerOutcomeRef = firestore()
        .collection('PeerOutcome')
        .doc(peerAge.toString()) // 나이 그룹
        .collection('peer')
        .doc('outcome');

      // Firestore 데이터 가져오기
      const peerDoc = await peerOutcomeRef.get();

      if (peerDoc.exists) {
        const { outcome } = peerDoc.data();
        console.log('Fetched Peer Outcome:', outcome);
        return outcome; // 데이터 반환
      } else {
        console.log('No data found for peer outcome.');
        return 0; // 데이터가 없으면 0 반환
      }
    } catch (error) {
      console.error('Error fetching peer outcome:', error);
      return 0; // 오류 발생 시 기본값 0 반환
    }
  };

  // 확인 버튼 클릭 시
  const handleConfirmClick = async () => {
    if (!selectedDate) {
      Alert.alert('입력 오류', '연도와 월을 선택하세요.');
      return;
    }

    if (!validateAge(age)) {
      Alert.alert('입력 오류', '나이를 올바르게 입력하세요.');
      return;
    }

    try {
      const chartData = await fetchChartData(uid);
      setChartData(chartData); // 주차별 차트 데이터 설정

      const totalOutcome = chartData.reduce((total, week) => total + week.expense, 0); // 내 지출 설정
      setMyOutcome(totalOutcome);

      const peerOutcome = await fetchPeerOutcome(age);
      setPeerOutcome(peerOutcome);

      setIsConfirmed(true); // 데이터 확인 상태로 변경
    } catch (error) {
      Alert.alert('오류 발생', '데이터를 불러오는 중 문제가 발생했습니다.');
    }
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
              income={myOutcome}
              outcome={peerOutcome}
              isAgeCompare={true} // AgeCompare 페이지에서 사용
              incomeLabel="내 지출"
              outcomeLabel="또래 지출"
            />
            <Text style={styles.note}>
              {`${formatDate(selectedDate)}은 또래보다 ${Math.abs(
                myOutcome - peerOutcome
              ).toLocaleString()}원 ${
                myOutcome > peerOutcome ? '더 사용했어요' : '덜 사용했어요'
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
