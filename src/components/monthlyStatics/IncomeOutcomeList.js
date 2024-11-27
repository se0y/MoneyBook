// src/components/monthlyStatics/IncomeExpenseList.js
// 월별 통게 페이지 - 수입, 지출 목록

import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ShopCategory from '../../asset/category/monthly/ShopCategory.svg';
import FoodCategory from '../../asset/category/monthly/FoodCategory.svg';
import CafeCategory from '../../asset/category/monthly/CafeCategory.svg';
import ConvenienceCategory from '../../asset/category/monthly/ConvenienceCategory.svg';
import MoneyCategory from '../../asset/category/monthly/MoneyCategory.svg';
import EtcCategory from '../../asset/category/monthly/EtcCategory.svg';
import IncomeIcon from '../../asset/income/IncomeColored.svg';
import ExpenseIcon from '../../asset/expense/ExpenseColored.svg';
import styles from '../../styles/monthlyStatics/incomeOutcomeListStyles';

const categoryIcons = {
  식비: FoodCategory,
  쇼핑: ShopCategory,
  카페: CafeCategory,
  편의점: ConvenienceCategory,
  이체: MoneyCategory,
  기타: EtcCategory,
};

const IncomeOutcomeList = ({ incomeList, outcomeList, selectedType, selectedYear, selectedMonth }) => {
  const monthName = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"][selectedMonth - 1];
  const isIncome = selectedType === 'income';
  const dataList = isIncome ? incomeList : outcomeList;
  const listHeader = `${monthName} ${isIncome ? '수입' : '지출'}`;
  const HeaderIcon = isIncome ? IncomeIcon : ExpenseIcon;

   // 금액 합계를 계산
   const totalAmount = dataList.reduce((acc, item) => acc + item.money, 0);

   return (
       <View style={styles.container}>
         {/* 리스트 헤더 */}
         <Text style={styles.listHeader}>{listHeader}</Text>

         {/* 아이콘과 총 금액을 같은 줄에 배치 */}
         <View style={styles.totalContainer}>
           <HeaderIcon width={24} height={24} style={styles.headerIcon} />
           {dataList.length === 0 ? (
             <Text style={styles.emptyMessage}>{`${listHeader} 목록이 없습니다.`}</Text>
           ) : (
             <Text style={[styles.totalAmount, isIncome ? styles.incomeAmount : styles.expenseAmount]}>
               {totalAmount.toLocaleString()}
             </Text>
           )}
         </View>

         {/* 목록 렌더링 */}
         {dataList.length > 0 && (
           <FlatList
             data={dataList}
             keyExtractor={(item) => item.id.toString()}
             renderItem={({ item }) => {
               const CategoryIcon = categoryIcons[item.category] || EtcCategory;

               return (
                 <View style={styles.listItem}>
                   <View style={styles.iconContainer}>
                     <CategoryIcon width={50} height={50} />
                   </View>
                   <View style={styles.listItemContent}>
                     <Text style={styles.listItemTitle}>{item.memo}</Text>
                     <Text style={styles.listItemDate}>{`${item.time} - ${new Date(item.date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}`}</Text>
                   </View>
                   <Text style={[styles.listItemAmount, isIncome ? styles.incomeAmount : styles.expenseAmount]}>
                     {isIncome ? '+' : '-'}{item.money.toLocaleString()}
                   </Text>
                 </View>
               );
             }}
           />
         )}
       </View>
     );
   };

   export default IncomeOutcomeList;
