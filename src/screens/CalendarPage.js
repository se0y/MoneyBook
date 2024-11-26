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

  // 카테고리 구분
  const categoryKeywords = {
    편의점: ['CU', 'GS25', '세븐일레븐', 'Emart24'], // 편의점 키워드들
    카페: ['스타벅스', '커피빈', '이디야커피', '투썸플레이스'], // 카페 키워드들
    식비: ['피자스쿨', '맘스터치', 'BBQ', 'Kyochon'], // 식비 키워드들
    쇼핑: ['롯데백화점', '신세계', '이마트', '홈플러스'], // 쇼핑몰 키워드들
    이체: ['입금', '인터넷출금', '출금'], // 이체 관련 키워드들
    '기타': [] // 기타
  };

  // 오늘 날짜 가져오기
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // "YYYY-MM-DD" 형식 반환
  };

  // SMS 리스너 설정
  useEffect(() => {
    const subscription = SmsListener.addListener(handleNewMessage);
    console.log('SMS 리스너가 등록되었습니다.');

    const today = getTodayDate();
    console.log(today);
    onDateSelect(today); // 선택된 날짜를 오늘로 설정

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      subscription.remove();
      console.log('SMS 리스너가 제거되었습니다.');
    };
  }, []);



  // Firestore에서 데이터 조회
  const fetchTransactionsByDate = async (userId="서연", date) => {
    try {
      const userRef = firestore().collection('Users').doc(userId);
      const dateRef = userRef.collection(date); // 선택된 날짜의 서브컬렉션 참조

      const snapshot = await dateRef.get();
      const transactions = [];
      // console.log('스냅샷 : ', snapshot);

      // Firestore 문서를 배열로 변환
      snapshot.forEach(doc => {
        const data = doc.data();
        // 'income'과 'outcome' 배열을 합쳐서 반환
        if (data.transactions) {
          transactions.push(...data.transactions);
        }
      });

      return transactions;
    } catch (error) {
      console.error('데이터 조회 실패 :', error);
      return [];
    }
  };

  // Firestore에 데이터 추가
  const addTransaction = async (userId, date, transaction) => {
    try {
      const userRef = firestore().collection('Users').doc(userId);
      const dateRef = userRef.collection(date); // 선택된 날짜의 서브컬렉션 참조
  
      // 양수는 'income', 음수는 'outcome' 문서에 추가
      const docName = transaction.money > 0 ? 'income' : 'outcome';
  

      const docRef = dateRef.doc(docName);
      // 문서에 배열 형태로 거래 내역 추가
      await docRef.set(
        {
          transactions: firestore.FieldValue.arrayUnion({
            category: transaction.category,
            memo: transaction.memo,
            money: transaction.money,
            time: transaction.time,
          })
        },
        { merge: true } // 문서가 없으면 생성하고, 있으면 기존 데이터에 병합
      );
  
      console.log(`${docName}에 데이터 추가:`, transaction);
    } catch (error) {
      console.error('데이터 추가 오류:', error);
    }
  };
  
  //

  // 날짜 선택 시 데이터 업데이트
  const onDateSelect = async (day) => {
    setSelectedDate(day); // 선택된 날짜 설정
  
    const userId = '서연'; // (유저id 받아오면 수정할 것)
    const transactions = await fetchTransactionsByDate(userId, day); // Firestore에서 데이터 조회
  
    setTransactions(transactions); // 조회된 거래 내역을 상태로 설정
    // 상태가 변경되었을 때 로그 찍기
    console.log('부모 컴포넌트 선택된 날짜:', day);
    console.log('부모 컴포넌트 현재 거래 내역:', transactions); // 현재 거래 내역 로그 찍기
  };


  // 모달 열기 및 닫기 함수
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);


  // handleSaveTransaction 함수 정의
  // 저장 버튼 클릭 시 데이터 추가
  const handleSaveTransaction = async (data) => {
    const userId = '서연'; // (유저id 받아오면 수정할 것)
    const date = selectedDate; // 선택된 날짜 

    await addTransaction(userId, date, data); // Firestore에 데이터 추가

    // Firestore에서 업데이트된 데이터 다시 조회
    const updatedTransactions = await fetchTransactionsByDate(userId, date);
    setTransactions(updatedTransactions); // 업데이트된 거래 내역으로 상태 갱신
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
    console.log('파싱 함수에 들어온 메시지 :', message);
    // 정규표현식 적용
    const regex = /\[Web발신\]\s*KB국민체크\((\d+)\)\s*(.*?)\s*(\d+\/\d+)\s*(\d+:\d+)\s*([\d,]+)원\s*(.*?)사용/;
    
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
  const handleNewMessage = async (message) => {
    const messageBody = message.body; // 메시지 내용 (body)만 추출
    const originatingAddress = message.originatingAddress; // 발신자의 전화번호
    console.log("도착한 문자 :", message);
    console.log("도착한 문자 메시지:", messageBody);
    console.log("발신자 번호:", originatingAddress);

    // 특정 번호로 오는 문자만 처리 (국민은행)
    if (originatingAddress === '0218551688') {
      // console.log("parseMessage 호출 직전:", messageBody);
      const parsedData = parseMessage(messageBody);
      // console.log("parseMessage 반환값:", parsedData);
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
        setSelectedDate(parsedData.date);

        // 파이어베이스에 거래 내역 추가
        await addTransaction('서연', parsedData.date, newTransaction);

        onDateSelect(parsedData.date); // 문자 온 날짜로 캘린더 클릭 & 데이터 조회
    } else {
      console.warn("문자 파싱 실패:", message);
    }
  } else {
    console.warn("특정 번호에서 온 메시지가 아님:", originatingAddress);
    }
  };
  // const handleNewMessage = (message) => {
  //   console.log("새 메시지가 감지되었습니다:", message); 
  // };  
  

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
        selectedDate={selectedDate} onDateSelect={onDateSelect} // 날짜 선택 시 onDateSelect 함수 실행        
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
