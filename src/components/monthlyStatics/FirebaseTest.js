import firestore from '@react-native-firebase/firestore';

const FirebaseTest = () => {
    // 1. 유저 데이터를 추가
    const addUserData = async (uid, userData) => {
      try {
        await firestore().collection('users').doc(uid).set({
          name: userData.name,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          birth: userData.birth,
          password: userData.password,
        });

        console.log('User data added successfully!');
      } catch (error) {
        console.error('Error adding user data:', error);
      }
    };

    // 2. 예산 데이터 추가
    const addBudgetData = async (uid, budgetData) => {
      try {
        const budgetRef = firestore()
          .collection('users')
          .doc(uid)
          .collection('budget');
        for (const { date, targetBudget } of budgetData) {
          await budgetRef.doc(date).set({ targetBudget });
        }
        console.log('Budget data added successfully!');
      } catch (error) {
        console.error('Error adding budget data:', error);
      }
    };

    // 3. 일일 수입/지출 데이터 추가
    const addDailyTransactionData = async (uid, date, transactionType, transactionData) => {
      try {
        await firestore()
          .collection('users')
          .doc(uid)
          .collection(date)
          .doc(transactionType) // 'income' or 'outcome'
          .set(transactionData);

        console.log(${transactionType} data added successfully for ${date}!);
      } catch (error) {
        console.error(Error adding ${transactionType} data:, error);
      }
    };

    // 4. 계층 데이터 추가 전체 함수
    const addCompleteUserData = async () => {
      const uid = '2'; // 유저 ID (문서 ID)
      const userData = {
        name: '미정',
        email: '2271224@hansung.ac.kr',
        phoneNumber: '010-1234-5678',
        birth: '2004-01-08',
        password: 'testpassword',
      };

      const budgetData = [
        { date: '2024-11', targetBudget: 5000 },
        { date: '2024-12', targetBudget: 6000 },
      ];

      const dailyTransactions = [
        {
          date: '2024-10-15',
          outcome: {
            money: 3000,
            memo: 'gs25에서 과자 사먹음',
            time: '08:00',
            category: '편의점',
          },
        },
        {
          date: '2024-11-19',
          income: {
            money: 4000,
            memo: '이체금',
            time: '10:00',
            category: '이체',
          },
          outcome: {
            money: 2000,
            memo: '메가커피에서 아이스 아메리카노 사먹음',
            time: '10:00',
            category: '식비',
          },
        },
      ];

      try {
        // 유저 데이터 추가
        await addUserData(uid, userData);

        // 예산 데이터 추가
        await addBudgetData(uid, budgetData);

        // 수입/지출 데이터 추가
        for (const { date, income, outcome } of dailyTransactions) {
          if (income) {
            await addDailyTransactionData(uid, date, 'income', income);
          }
          if (outcome) {
            await addDailyTransactionData(uid, date, 'outcome', outcome);
          }
        }

        console.log('유저 데이터 저장 완료');
      } catch (error) {
        console.error('Error adding complete user data:', error);
      }
    };

    // 호출
    addCompleteUserData();
}

export default FirebaseTest;