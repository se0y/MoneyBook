// src/components/monthlyStatics/MonthlyChart.js
// 월별 통게 페이지 - 월별 수입 지출 차트

import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import styles from '../../styles/monthlyStatics/monthlyChartStyles'; // 스타일 파일 임포트

const MonthlyChart = () => {
  // 차트에 표시할 데이터
  const data = [
    { label: '1월', income: 12000, expense: 8000 },
    { label: '2월', income: 4000, expense: 7000 },
    { label: '3월', income: 8000, expense: 1000 },
    { label: '4월', income: 10000, expense: 5000 },
    { label: '5월', income: 15000, expense: 12000 },
    { label: '6월', income: 2000, expense: 500 },
    { label: '7월', income: 12000, expense: 8000 },
    { label: '8월', income: 4000, expense: 7000 },
    { label: '9월', income: 8000, expense: 1000 },
    { label: '10월', income: 10000, expense: 5000 },
    { label: '11월', income: 15000, expense: 12000 },
    { label: '12월', income: 2000, expense: 500 },
  ];

  // BarChart 컴포넌트에서 사용할 형식으로 데이터 변환
  const barData = data
    .map((item) => [
      {
        value: item.income / 1000,
        label: item.label,
        frontColor: '#A2845E', // 수입 색상
        labelComponent: () => <Text style={styles.labelStyle}>{item.label}</Text>,
      },
      {
        value: item.expense / 1000,
        label: '',
        frontColor: '#E97072', // 지출 색상
      },
    ])
    .flat();

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>수입과 지출</Text>
      <BarChart
        data={barData}
        barWidth={12}
        barBorderRadius={4}
        spacing={10}
        stepValue={5} // y축의 각 단계의 차이 설정 (단계 간격을 5k로)
        maxValue={15} // y축의 최대값을 15k로 설정
        yAxisLabelWidth={50}
        xAxisThickness={1}
        yAxisThickness={1}
        height={220}
        width={272}
        hideRules={false}
        rulesColor="#D3D3D3"
        yAxisLabelSuffix="k" // y축 레이블 앞에 'k'를 추가
        yAxisTextStyle={{ color: '#333', fontSize: 12 }} // y축 레이블 스타일
      />
    </View>
  );
};

export default MonthlyChart;
