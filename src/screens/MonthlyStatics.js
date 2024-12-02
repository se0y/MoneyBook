// src/screens/MonthlyStatics.js
// 월별 통계 페이지

import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import AmountSummary from '../components/monthlyStatics/AmountSummary';
import Header from '../components/common/Header';
import BudgetIndicator from '../components/monthlyStatics/BudgetIndicator';
import MonthlyChart from '../components/common/CustomChart';
import AmountDetail from '../components/common/AmountDetail';
import LineIcon from '../asset/MonthlyStaticsLine.svg';
import firestore from '@react-native-firebase/firestore'; // Firestore 연동
import styles from '../styles/monthlyStatics/monthlyStaticsStyles';

import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // UserContext 가져오기


const MonthlyStatics = () => {
  const { userId } = useContext(UserContext); // uid 가져오기

  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState(0); // 이번달 수입
  const [outcome, setOutcome] = useState(0); // 이번달 지출
  const [budget, setBudget] = useState(0); // 이번달 예산
  const [lastMonthIncome, setLastMonthIncome] = useState(0); // 지난달 수입
  const [lastMonthOutcome, setLastMonthOutcome] = useState(0); // 지난달 지출
  const [chartData, setChartData] = useState([]); // 월별 차트 데이터
  const [incomeList, setIncomeList] = useState([]); // 수입 상세 리스트
  const [outcomeList, setOutcomeList] = useState([]); // 지출 상세 리스트

  // Firebase에서 월별 데이터를 가져오는 함수
  const fetchMonthlyData = async () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 현재 월
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // 지난달

    const newChartData = Array.from({ length: 12 }, (_, i) => ({
      label: `${i + 1}월`, // 1월부터 12월까지 생성
      income: 0,
      expense: 0,
    }));

    const newIncomeList = [];
    const newOutcomeList = [];

    let totalIncome = 0; // 현재 달 총 수입
    let totalOutcome = 0; // 현재 달 총 지출
    let lastMonthIncomeTotal = 0; // 지난달 총 수입
    let lastMonthOutcomeTotal = 0; // 지난달 총 지출

    try {
      const userRef = firestore().collection('Users').doc(userId);

      // Firebase에서 availableDates 필드 가져오기
      const userSnapshot = await userRef.get();
      if (!userSnapshot.exists) {
        console.error("User data not found.");
        return;
      }

      const { availableDates } = userSnapshot.data();
      if (!availableDates || !Array.isArray(availableDates)) {
        console.error("No available dates found.");
        return;
      }

      // availableDates를 빠른 날짜 순으로 정렬
      availableDates.sort((a, b) => new Date(a) - new Date(b));

      await Promise.all(
        Array.from({ length: currentMonth }, (_, i) => i + 1).map(async (month) => {
          const monthPrefix = `${currentYear}-${String(month).padStart(2, '0')}`;
          const monthlyDates = availableDates.filter((date) => date.startsWith(monthPrefix));

          let monthlyIncome = 0;
          let monthlyOutcome = 0;

          await Promise.all(
            monthlyDates.map(async (date) => {
              const processDoc = async (docType, list, updateMonthlySum) => {
                const doc = await userRef.collection(date).doc(docType).get();

                if (doc.exists) {
                  const data = doc.data();
                  const transactions = data.transactions || {}; // transactions 필드 가져오기 (Map 형태)

                  // transactions 맵의 각 항목을 순회하여 리스트에 추가
                  Object.entries(transactions).forEach(([key, transaction]) => {
                    const amount = transaction.money || 0; // 금액 추출
                    updateMonthlySum(amount); // 월별 총합 업데이트

                    // 리스트에 추가
                    list.push({
                      id: key, // 맵의 키를 ID로 사용
                      memo: transaction.memo || '', // 메모
                      money: amount, // 금액
                      date: date, // 날짜
                      time: transaction.time || '', // 시간
                      category: transaction.category || '', // 카테고리
                    });
                  });
                }
              };

              await Promise.all([
                processDoc('income', newIncomeList, (amount) => (monthlyIncome += amount)),
                processDoc('outcome', newOutcomeList, (amount) => (monthlyOutcome += amount)),
              ]);
            })
          );

          // 차트 데이터 업데이트
          newChartData[month - 1].income = monthlyIncome;
          newChartData[month - 1].outcome = -monthlyOutcome;

          // 현재 달이면 상태 업데이트
          if (month === currentMonth) {
            setIncome(monthlyIncome);
            setOutcome(monthlyOutcome);
            setIncomeList([...newIncomeList]);
            setOutcomeList([...newOutcomeList]);
            totalIncome = monthlyIncome;
            totalOutcome = monthlyOutcome;
          }

          // 지난달이면 상태 업데이트
          if (month === previousMonth) {
            setLastMonthIncome(monthlyIncome);
            setLastMonthOutcome(monthlyOutcome);
            lastMonthIncomeTotal = monthlyIncome;
            lastMonthOutcomeTotal = monthlyOutcome;
          }
        })
      );

      setChartData(newChartData); // 최종 차트 데이터 업데이트

      // incomeList와 outcomeList를 날짜순으로 정렬
      newIncomeList.sort((a, b) => new Date(a.date) - new Date(b.date));
      newOutcomeList.sort((a, b) => new Date(a.date) - new Date(b.date));

      setIncomeList(newIncomeList);
      setOutcomeList(newOutcomeList);
    } catch (error) {
      console.error('Error fetching monthly data:', error);
    }
  };

  // 이번 달 예산 가져오기
  const fetchMonthlyBudget = async () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const targetPrefix = `${currentYear}-${currentMonth}`;

    try {
      const userRef = firestore().collection('Users').doc(userId);
      const budgetDoc = await userRef.collection('budget').doc(targetPrefix).get();
      if (budgetDoc.exists) {
        const fetchedBudget = budgetDoc.data().targetBudget;
        setBudget(fetchedBudget);
        console.log(`이번달 예산: ${budget}`);
      }
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchMonthlyData();
      await fetchMonthlyBudget();
      setLoading(false);
    };

    console.log(`수입 리스트: ${JSON.stringify(incomeList, null, 2)}`);
    console.log(`지출 리스트: ${JSON.stringify(outcomeList, null, 2)}`);

    fetchData();
  }, []);

  // 섹션 데이터
  const sections = [
    {
      key: 'summary',
      component: (
        <View style={styles.summaryContainer}>
          <AmountSummary label="총 잔액" isBudget={true} budget={budget} outcome={outcome} />
          <LineIcon height={47} style={styles.lineIcon} />
          <AmountSummary label="총 지출" isBudget={false} budget={budget} outcome={outcome} />
        </View>
      ),
    },
    {
      key: 'budget',
      component: <BudgetIndicator budget={budget} outcome={-outcome} />,
    },
    {
      key: 'chart',
      component: (
        <View style={styles.roundedContainer}>
          <MonthlyChart chartData={chartData} />
          <AmountDetail
            income={income}
            incomeChange={income - lastMonthIncome}
            outcome={outcome}
            outcomeChange={-outcome + lastMonthOutcome}
            incomeList={incomeList}
            outcomeList={outcomeList}
          />
        </View>
      ),
    },
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" marginTop="30" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => item.component}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <Header title="나의 월별 통계" backgroundColor='#FFD38B' marginRight={30} />
        }
      />
    </View>
  );

};

export default MonthlyStatics;
