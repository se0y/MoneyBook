// firebase.js
import firestore from '@react-native-firebase/firestore';

export const saveBudgetToFirebase = async (BudgetSettingDate, BudgetSetting) => {
  try {
    await firestore().collection('Budget').add({
      BudgetSettingDate, // 예산 설정 날짜
      BudgetSetting, // 예산 설정 값
      createdAt: firestore.FieldValue.serverTimestamp(), // 서버 시간 추가
    });
    console.log('Budget saved successfully');
  } catch (error) {
    console.error('Error saving budget:', error);
  }
};