import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import SmsListener from 'react-native-android-sms-listener';

import CalendarComponent from '../components/Calendar'; 
import TransactionList from '../components/TransactionList'; 
import FloatingButton from '../components/FloatingButton';
import CalendarModal from '../components/CalendarBottomSheet';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Firestore 데이터 불러오기
  

  // 카테고리 구분
  const categoryKeywords = {
    편의점: ['CU', 'GS25', '세븐일레븐', 'Emart24'], // 편의점 키워드들
    카페: ['스타벅스', '커피빈', '이디야커피', '투썸플레이스'], // 카페 키워드들
    식당: ['피자스쿨', '맘스터치', 'BBQ', 'Kyochon'], // 식당 키워드들
    쇼핑: ['롯데백화점', '신세계', '이마트', '홈플러스'], // 쇼핑몰 키워드들
    교통: ['버스', '지하철', '택시', '카카오T'], // 교통 관련 키워드들
    '기타': [] // 기타
  };

  // 예시 데이터 (Firestore에서 가져올 데이터 대신 사용)
  const exampleData = {
    '2024-11-19': {
      income: [
        { money: +35000, memo: '교통비 환급', time: '17:26', category: '교통' },
      ],
      outcome: [
        { money: -10000, memo: 'CU 편의점', time: '21:03', category: '편의점' },
      ],
    },
    '2024-11-20': {
      income: [
        { money: +50000, memo: '급여', time: '09:00', category: '이체' },
      ],
      outcome: [
        { money: -15000, memo: '유니클로', time: '15:40', category: '쇼핑' },
      ],
    },
  };

  // 날짜 선택 시 데이터 업데이트
  const onDateSelect = (day) => {
    setSelectedDate(day); // 선택된 날짜 설정
    const selectedTransactions = exampleData[day] || { income: [], outcome: [] };
    
    // income과 outcome 데이터를 하나의 배열로 합침
    const allTransactions = [
      ...selectedTransactions.income,
      ...selectedTransactions.outcome,
    ];

    setTransactions(allTransactions);

    // 상태가 변경되었을 때 로그 찍기
    console.log('부모 컴포넌트 선택된 날짜:', day);
    console.log('부모 컴포넌트 현재 거래 내역:', allTransactions); // 현재 거래 내역 로그 찍기
  };

  // 상태가 변경될 때마다 로그 찍기 위해 useEffect 사용
  // useEffect(() => {
  //   console.log('부모 transactions 상태 업데이트:', transactions); // transactions 상태가 변경된 후 실행
  // }, [transactions]); // transactions 상태가 변경될 때마다 실행
  // useEffect(() => {
  //   console.log('Bottom Sheet 상태 변화:', isBottomSheetVisible);
  // }, [isBottomSheetVisible]);
  


  // 모달 열기 및 닫기 함수
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // handleSaveTransaction 함수 정의
  const handleSaveTransaction = (data) => {
    console.log('저장된 데이터:', data); // 데이터를 콘솔에 출력하거나 서버에 저장
    
    // 선택된 날짜에 추가
    const updatedTransactions = [...transactions, data];
    setTransactions(updatedTransactions); // 거래 리스트 업데이트
  };

  // 카테고리 분류 함수
  const categorizeTransaction = (message) => {
    // 메시지 내에서 모든 카테고리를 순회하면서 키워드가 포함되어 있는지 확인
    for (const category in categoryKeywords) {
      for (const keyword of categoryKeywords[category]) {
        if (message.includes(keyword)) {
          return category; // 해당 카테고리 반환
        }
      }
    }
    return '기타'; // 해당 카테고리에 속하는 키워드가 없으면 '기타' 카테고리로 반환
  };
  
  // 문자 파싱 함수
  const parseMessage = (message) => {
    // 새로운 정규표현식 적용
    const regex = /\[Web발신\]\s*KB국민체크\((\d+)\)\s*(.*?)\s*(\d+\/\d+)\s*(\d+:\d+)\s*([\d,]+)원\s*(.*)/;
    
    const match = message.match(regex);
    
    if (match) {
      const memo = match[6]; // 예: CU 한성대점
      const category = categorizeTransaction(memo); // 카테고리 자동 추출
  
      return {
        date: `2024-${match[3].replace("/", "-")}`, // 예: 2024-11-21
        time: match[4], // 예: 19:42
        amount: parseInt(match[5].replace(",", ""), 10), // 예: 3600
        memo: memo, // 예: CU 한성대점
        category: category // 자동으로 카테고리 설정
      };
    }
  
    return null; // 파싱 실패 시 null 반환
  };  

  // 수신 문자 자동 입력 
  const handleNewMessage = (message) => {
    const messageBody = message.body; // 메시지 내용 (body)만 추출
    const originatingAddress = message.originatingAddress; // 발신자의 전화번호

    console.log("도착한 문자 메시지:", messageBody);
    console.log("발신자 번호:", originatingAddress);

    // 특정 번호로 오는 문자만 처리
    if (originatingAddress === '0218551688') {
      const parsedData = parseMessage(messageBody);
      if (parsedData) {
        const newTransaction = {
          date: parsedData.date,
          money: -parsedData.amount, // 결제 금액은 음수 처리
          memo: parsedData.memo,
          time: parsedData.time,
          category: parsedData.category,
        };

        console.log("메시지 키워드로 분리:", newTransaction);

        // 파싱된 날짜를 selectedDate로 설정
        onDateSelect(parsedData.date);
  
        // 날짜별로 거래 내역 추가
        setTransactions((prev) => [...prev, newTransaction]);
        console.log("리스트 추가:", transactions);
    } else {
      console.warn("문자 파싱 실패:", message);
    }
  } else {
    console.warn("특정 번호에서 온 메시지가 아님:", originatingAddress);
    }
  };

  // 날짜 변경 시 로그 찍기
  // useEffect(() => {
  //   if (selectedDate) {
  //     console.log('현재 선택된 날짜:', selectedDate);
  //     // 날짜가 변경될 때마다 transactions 업데이트
  //     const selectedTransactions = exampleData[selectedDate] || { income: [], outcome: [] };
  //     const allTransactions = [
  //       ...selectedTransactions.income,
  //       ...selectedTransactions.outcome,
  //     ];
  
  //     setTransactions(allTransactions); // transactions 상태 업데이트
  //   }
  // }, [selectedDate]); // selectedDate가 변경될 때마다 실행

  // SMS 리스너 설정
  useEffect(() => {
    const subscription = SmsListener.addListener(handleNewMessage);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      subscription.remove();
    };
  }, []);
  
  

  return (
    <View style={styles.container}>
      {/* 맨 위 여백 => 추후 햄버거 바&알림버튼으로 변경 */}
      <View style={{ marginTop: 30 }} />

      {/* 제목 */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#093030', textAlign: 'center' }}>
        Calendar
      </Text>

      {/* 여백 */}
      <View style={{ marginVertical: 5 }} />

      {/* 캘린더 */}
      <CalendarComponent
        onDateSelect={onDateSelect} // 날짜 선택 시 onDateChange 함수 실행        
      />

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 날짜별 내역 */}
      <TransactionList transactions={transactions} />

      {/* 플로팅 버튼 (모달 열기) */}
      <FloatingButton onPress={openModal} />

      {/* 모달 */}
      <CalendarModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onSave={handleSaveTransaction}
        selectedDate={selectedDate} // 선택된 날짜 전달
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EA',
    padding: 16,
  },
  divider: {
    width: 300,
    height: 4,
    alignSelf: 'center',
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#093030',
    textAlign: 'center',
    marginVertical: 20,
  },
  
});
