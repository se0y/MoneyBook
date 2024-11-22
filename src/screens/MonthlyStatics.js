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
import { useMonthlyStatics } from '../context/MonthlyStaticsContext'; // Context 사용

const MonthlyStatics = () => {
  const uid = "2"; // 테스트 uid

  const { cachedData, setCachedData } = useMonthlyStatics(); // 컨텍스트 사용
  const [loading, setLoading] = useState(true);

  const [income, setIncome] = useState(cachedData.income); // 이번달 수입
  const [outcome, setOutcome] = useState(cachedData.outcome); // 이번달 지출
  const [budget, setBudget] = useState(cachedData.budget); // 이번달 예산
  const [lastMonthIncome, setLastMonthIncome] = useState(cachedData.lastMonthIncome); // 지난달 수입
  const [lastMonthOutcome, setLastMonthOutcome] = useState(cachedData.lastMonthOutcome); // 지난달 예산
  const [chartData, setChartData] = useState(cachedData.chartData); // 월별 차트 데이터
  const [incomeList, setIncomeList] = useState(cachedData.incomeList); // 수입 상세 리스트
  const [outcomeList, setOutcomeList] = useState(cachedData.outcomeList); // 지출 상세 리스트

  // Firebase에서 월별 데이터를 가져오는 함수
  const fetchMonthlyData = async () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const newChartData = [];
    const newIncomeList = [];
    const newOutcomeList = [];

    let currentMonthIncome = 0;
    let currentMonthOutcome = 0;
    let lastMonthIncome = 0;
    let lastMonthOutcome = 0;

    try {
      const userRef = firestore().collection('Users').doc(uid);

      for (let month = 1; month <= currentMonth; month++) {
        const monthPrefix = `${currentYear}-${String(month).padStart(2, '0')}`;
        const possibleDates = Array.from({ length: 31 }, (_, i) =>
          `${monthPrefix}-${String(i + 1).padStart(2, '0')}`
        );

        let monthlyIncome = 0;
        let monthlyOutcome = 0;

        for (const date of possibleDates) {
          // 공통적으로 수입 또는 지출 데이터를 처리하는 함수
          const processDoc = async (docType, list, updateMonthlySum) => {
            const doc = await userRef.collection(date).doc(docType).get();
            if (doc.exists) {
              const data = doc.data();
              const amount = data.money || 0;

              // 월별 수입/지출 총합 업데이트
              updateMonthlySum(amount);

              // 리스트에 추가
              list.push({
                id: doc.id, // Firestore 문서의 고유 ID
                memo: data.memo || '',
                money: amount,
                date: date,
                time: data.time || '',
                category: data.category || '',
              });
            }
          };

          // 병렬로 수입 및 지출 데이터를 처리
          await Promise.all([
            processDoc('income', newIncomeList, (amount) => (monthlyIncome += amount)),
            processDoc('outcome', newOutcomeList, (amount) => (monthlyOutcome += amount)),
          ]);
        }

        newChartData.push({
          label: `${month}월`,
          income: monthlyIncome,
          expense: monthlyOutcome,
        });

        if (month === currentMonth) {
          currentMonthIncome = monthlyIncome;
          currentMonthOutcome = monthlyOutcome;
        }

        // 지난달 데이터 저장
         const isLastMonth =
           currentMonth === 1
             ? month === 12 && currentYear - 1 === currentYear
             : month === currentMonth - 1;

         if (isLastMonth) {
           lastMonthIncome = monthlyIncome;
           lastMonthOutcome = monthlyOutcome;
         }
      }

      setIncome(currentMonthIncome);
      setOutcome(currentMonthOutcome);
      setLastMonthIncome(lastMonthIncome);
      setLastMonthOutcome(lastMonthOutcome);
      setChartData(newChartData);

      setIncomeList(newIncomeList);
      setOutcomeList(newOutcomeList);

      setCachedData((prev) => ({
        ...prev,
        income: currentMonthIncome,
        outcome: currentMonthOutcome,
        lastMonthIncome: lastMonthIncome,
        lastMonthOutcome: lastMonthOutcome,
        chartData: newChartData,
        incomeList: newIncomeList,
        outcomeList: newOutcomeList,
      }));
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
      const userRef = firestore().collection('Users').doc(uid);
      const budgetDoc = await userRef.collection('budget').doc(targetPrefix).get();
      if (budgetDoc.exists) {
        const fetchedBudget = budgetDoc.data().targetBudget;
        setBudget(fetchedBudget);

        setCachedData((prev) => ({
          ...prev,
          budget: fetchedBudget,
        }));

        console.log(`이번달 예산: ${budget}`);
      }
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  // 데이터 로드 및 캐싱 확인
  useEffect(() => {
    if (!cachedData.chartData.length) {
      const fetchData = async () => {
        setLoading(true);
        await fetchMonthlyData();
        await fetchMonthlyBudget();
        setLoading(false);
      };

      console.log("파이어베이스에서 월별 통계 데이터 조회");

      fetchData();
    } else {
      setBudget(cachedData.budget);
      setIncome(cachedData.income);
      setOutcome(cachedData.outcome);
      setLastMonthIncome(cachedData.lastMonthIncome);
      setLastMonthOutcome(cachedData.lastMonthOutcome);
      setChartData(cachedData.chartData);
      setIncomeList(cachedData.incomeList);
      setOutcomeList(cachedData.outcomeList);
      setLoading(false);

      console.log("context에서 월별 통계 데이터 조회");
      console.log(incomeList);
      console.log(outcomeList);
      console.log(`지난달 수입: ${lastMonthIncome}`);
      console.log(`지난달 지출: ${lastMonthOutcome}`);
    }
  }, [cachedData]);

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
      component: <BudgetIndicator budget={budget} outcome={outcome} />,
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
            outcomeChange={outcome - lastMonthOutcome}
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
      <Header title="나의 월별 통계" />
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => item.component}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default MonthlyStatics;
