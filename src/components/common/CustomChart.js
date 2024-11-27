// src/components/common/CustomChart.js
// 월별 통계 페이지, 연령대별 지출 비교 페이지 - 차트

import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import styles from '../../styles/common/customChartStyles';

const CustomChart = ({ chartData, space = 10 }) => {
  // BarChart 컴포넌트에서 사용할 형식으로 데이터 변환
  const barData = chartData
    .map((item) => [
      {
        value: item.income / 1000,
        label: item.label,
        frontColor: '#A2845E', // 수입 색상
        labelComponent: () => (
          <Text
            style={{
              ...styles.labelStyle,
              transform: [{ translateX: space / 3 }], // space에 따라 translateX 조정
            }}
          >
            {item.label}
          </Text>
        ),
      },
      {
        value: item.outcome / 1000,
        label: '',
        frontColor: '#E97072', // 지출 색상
      },
    ])
    .flat();

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>수입과 지출</Text>
      <View style={styles.chartWrapper}>
        <BarChart
          data={barData}
          barWidth={12}
          barBorderRadius={4}
          spacing={space} // space prop
          stepValue={20} // Y축 값 간격을 10k로 설정
          maxValue={100} // Y축 최대값을 50k로 설정
          yAxisLabelWidth={50}
          xAxisThickness={1}
          yAxisThickness={1}
          height={220}
          width={272}
          hideRules={false}
          rulesColor="#D3D3D3"
          yAxisLabelSuffix="k"
          yAxisTextStyle={{ color: '#333', fontSize: 12 }}
        />
      </View>
    </View>
  );
};

export default CustomChart;

