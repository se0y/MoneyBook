
import firestore from '@react-native-firebase/firestore';

export const saveBudgetToFirebase = async (BudgetSettingDate, BudgetSetting) => {
  try {
    const userId = '서연'; // 사용자 ID
    const targetDate = BudgetSettingDate; // 예산 설정 날짜

    // 문서 업데이트
    await firestore()
      .collection('Users')
      .doc(userId) // 사용자 ID
      .collection('budget')
      .doc(targetDate) // 날짜에 해당하는 문서
      .update({
        targetBudget: BudgetSetting, // targetBudget 필드에 새 예산 저장
        createdAt: firestore.FieldValue.serverTimestamp(), // 업데이트 시간
      });

    console.log('Budget updated successfully');
  } catch (error) {
    console.error('Error updating budget:', error);
  }
};
>>>>>>> origin/renee
