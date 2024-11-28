// TransactionList.js

import React from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';

const TransactionList = ({ transactions }) => {
  
  // 카테고리에 맞는 아이콘 반환
  const getCategoryImage = (category) => {
    switch (category) {
      case '식비':
        return require('../assets/FoodCategory.png');
      case '쇼핑':
        return require('../assets/ShopCategory.png');
      case '카페':
        return require('../assets/CafeCategory.png');
      case '편의점':
        return require('../assets/ConvenienceCategory.png');
      case '이체':
        return require('../assets/MoneyCategory.png');  
      default:
        return require('../assets/EctCategory.png');
    }
  };

  const renderItem = ({ item }) => {
    // 카테고리별 아이콘 불러오기
    const categoryIcon = getCategoryImage(item.category);
  
    return (
      <View style={styles.itemContainer}>
        {/* 카테고리별 아이콘 */}
        <Image source={categoryIcon} style={styles.icon} />
        
        <View style={styles.textContainer}>
          <Text style={styles.memo}>{item.memo}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        
        {/* 금액 앞에 + 또는 - 추가 */}
        <Text style={[styles.amount, { color: item.money > 0 ? '#093030' : '#0068FF' }]}>
          {item.money > 0 ? `+${item.money}` : `${item.money}`}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={<Text style={styles.noData}>내역이 없습니다.</Text>}
    />
  );
};
  
  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFF7EA',
      paddingHorizontal: 25,  // 왼쪽, 오른쪽 간격 넓게
      paddingVertical: 15,    // 위, 아래 간격 좁게
    },
    textContainer: {
      flex: 1,
      marginLeft: 18,
    },
    memo: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom : 5,
    },
    time: {
      fontSize: 14,
      color: '#337D69',
    },
    amount: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight : 5,
    },
    noData: {
      textAlign: 'center',
      color: '#999',
      marginTop: 15,
      fontSize: 14,
    },
  });
  
  export default TransactionList;