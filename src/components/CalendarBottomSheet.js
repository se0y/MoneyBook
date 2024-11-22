// CalendarBottomSheet.js
import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, Image, Pressable, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarModal = ({ isVisible, onClose, onSave, selectedDate }) => {
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState(selectedDate || ''); // 전달받은 날짜로 초기화
  const [isTimePickerVisible, setTimePickerVisible] = useState(false); // 시간 선택기 표시 상태

  useEffect(() => {
    if (selectedDate) {
      setDate(selectedDate); // selectedDate가 변경될 때마다 setDate 호출
    }
  }, [selectedDate]); // selectedDate가 변경될 때마다 실행

  console.log('전달받은 날짜', selectedDate)
  console.log('useState 설정한 날짜', date)


  // 카테고리 선택 함수
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory); // 카테고리 상태 업데이트
  };

  const handleSave = () => {
    // 거래 데이터 객체를 생성하여 부모 컴포넌트로 전달
    const transactionData = {
      money: amount,
      memo: memo,
      time: time,
      category: category,
      date: date,
    };

    onSave(transactionData); // 부모 컴포넌트로 데이터 전달
    onClose(); // 모달 닫기
  };

  // 시간을 선택하는 함수
  const handleChangeTime = (event, selectedTime) => {
    if (selectedTime) {
      const formattedTime = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;
      setTime(formattedTime); // 선택한 시간으로 상태 업데이트
    }
    setTimePickerVisible(false); // DateTimePicker 숨기기
  };

  const handleCancelTime = () => {
    setTimePickerVisible(false); // DateTimePicker 숨기기
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose} // 뒤로가기 버튼으로 닫기
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        {/* 모달 바깥 영역 */}
        <Pressable style={styles.transparentOverlay} onPress={onClose} />

        {/* 모달 콘텐츠 */}
        <View style={styles.modalContainer}>
          {/* 금액 입력 */}
          <Text style={styles.label}>금액 입력</Text>
          <TextInput style={styles.input} placeholder="-" keyboardType="numeric" 
            value={amount} onChangeText={setAmount} />

          {/* 메모 입력 */}
          <Text style={styles.label}>메모 적기</Text>
          <TextInput style={[styles.input, styles.memoInput]} placeholder="메모를 입력하세요" keyboardType="default" 
            value={memo} onChangeText={setMemo} multiline />

          {/* 날짜와 시간 */}
          <View style={styles.row}>
            <View style={styles.dateTimeContainer}>
              <TextInput style={styles.dateTimeInput} placeholder="2024.11.21" 
                value={date} onChangeText={setDate} editable />
              <Image source={require('../assets/calendarIcon.png')} style={styles.calendarIcon} />
            </View>

            <View style={styles.dateTimeContainer}>
              <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
              <TextInput style={styles.dateTimeInput} placeholder="15:30" 
                value={time} editable={false}/>
              </TouchableOpacity>
              <Image source={require('../assets/alarmIcon.png')} style={styles.alarmIcon} />
            </View>
          </View>

          {/* 카테고리 선택 */}
          <Text style={styles.label}>카테고리</Text>
          <View style={styles.categoryContainer}>
              <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategorySelect('편의점')}>
                <Image source={require('../assets/ConvenienceCategory.png')} style={styles.addCategoryButton} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategorySelect('카페')}>
                <Image source={require('../assets/CafeCategory.png')} style={styles.addCategoryButton} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategorySelect('식비')}>
                <Image source={require('../assets/FoodCategory.png')} style={styles.addCategoryButton} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addCategoryButton} onPress={() => handleCategorySelect('이체')}>
                <Image source={require('../assets/MoneyCategory.png')} style={styles.addCategoryButton} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addCategoryButton} onPress={() => handleCategorySelect('쇼핑')}>
                <Image source={require('../assets/ShopCategory.png')} style={styles.addCategoryButton} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addCategoryButton} onPress={() => handleCategorySelect('기타')}>
                <Image source={require('../assets/EctCategory.png')} style={styles.addCategoryButton} />
              </TouchableOpacity>
            </View>

          {/* 완료 버튼 */}
          <Pressable
            style={styles.completeButton}
            onPress={handleSave}
          >
            <Text style={styles.completeButtonText}>완료</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      {/* DateTimePickerModal 컴포넌트 추가 */}
      {isTimePickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="spinner"
          onChange={handleChangeTime}
        />
      )}

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  transparentOverlay: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#51786E',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#093030',
  },
  memoInput: {
    height: 90,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    width: '48%',
  },
  dateTimeInput: {
    height: 36,
    marginLeft: 10,
    fontSize: 15,
    color: '#093030',
  },
  calendarIcon: {
    width: 24, // 아이콘의 너비
    height: 20, // 아이콘의 높이
    marginLeft: 40, // 텍스트와 아이콘 사이의 간격
  },
  alarmIcon: {
    width: 22, // 아이콘의 너비
    height: 22, // 아이콘의 높이
    marginLeft: 78, // 텍스트와 아이콘 사이의 간격
  },
    categoryContainer: {
      backgroundColor: '#FFF',
      flexDirection: 'row',
      justifyContent: 'space-between',  // 각 버튼을 일정 간격으로 배치
      flexWrap: 'wrap',  // 버튼들이 한 줄을 채우면 자동으로 줄 바꿈
      width: '100%',
      borderRadius: 5,
    },
    categoryButton: {
      padding: 10,
      width: 57,  // 고정된 너비로 설정
      marginBottom: 5, // 각 버튼 간 하단 여백
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
    },
    addCategoryButton: {
      padding: 10,
      width: 57,  // 고정된 너비로 설정
      marginBottom: 5, // 각 버튼 간 하단 여백
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
    },
  completeButton: {
    marginTop: 20,
    backgroundColor: '#2E5047',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  completeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CalendarModal;
