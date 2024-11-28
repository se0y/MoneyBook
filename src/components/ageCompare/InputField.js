// src/components/ageCompare/InputFiled.js
// 연령대별 지출 비교 페이지 - 날짜, 나이 입력

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/ageCompare/inputFieldStyles';

const InputField = ({ label, value, onChange, onIconPress, isDate = false }) => {
  // 필드 클릭 시 처리
  const handlePress = () => {
    if (isDate && onIconPress) {
      onIconPress(); // 날짜 필드 클릭 이벤트 실행
    }
  };

  return (
    <View style={styles.container}>
      {/* 입력 필드 라벨 */}
      <Text style={styles.label}>{label}</Text>

      {/* 텍스트 입력 필드와 캘린더 아이콘 */}
      <TouchableOpacity
        style={styles.inputWrapper}
        onPress={isDate ? handlePress : undefined} // 날짜 필드일 경우만 클릭 이벤트 추가
        activeOpacity={isDate ? 0.8 : 1} // 클릭 효과 설정
      >
        <TextInput
          style={styles.input}
          value={value} // 입력값 표시
          onChangeText={(text) => {
            if (!isDate && onChange) {
              onChange(text); // 날짜가 아닐 경우에만 상태 업데이트
            }
          }}
          keyboardType={isDate ? 'default' : 'numeric'} // 키보드 타입 조건부 설정
          editable={!isDate} // 날짜 필드는 수정 불가능
          placeholder={isDate ? '연도와 월을 선택하세요' : '값을 입력하세요'} // 플레이스홀더
          placeholderTextColor="#999" // 플레이스홀더 색상
        />
        {isDate && (
          <FontAwesomeIcon icon={faCalendar} size={20} color="#A2845E" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputField;
