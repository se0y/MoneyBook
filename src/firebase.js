import firestore from '@react-native-firebase/firestore';

export const saveBudgetToFirebase = async (userId, BudgetSettingDate, BudgetSetting) => {
  try {
    const targetDate = BudgetSettingDate; // 예산 설정 날짜
    const budgetValue = parseInt(BudgetSetting, 10); // 숫자 형식으로 변환

    if (isNaN(budgetValue)) {
      throw new Error('Invalid budget value. It must be a number.');
    }

    console.log(`saveBudgetToFirebase: ${userId}, ${targetDate}, ${budgetValue}`);

    // 문서 생성 또는 업데이트
    await firestore()
      .collection('Users')
      .doc(userId) // 사용자 ID
      .collection('budget')
      .doc(targetDate) // 날짜에 해당하는 문서
      .set(
        {
          targetBudget: budgetValue, // targetBudget 필드 추가 또는 업데이트
        },
        { merge: true } // 기존 데이터와 병합
      );

    console.log('Budget saved successfully');
  } catch (error) {
    console.error('Error saving budget:', error);
    throw error; // 상위 호출로 에러 전달
  }
};
