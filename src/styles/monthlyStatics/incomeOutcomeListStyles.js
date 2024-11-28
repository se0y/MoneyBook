// src/styles/monthlyStatics/incomeOutcomeListStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  listHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D6D6D',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  headerIcon: {
    marginRight: 10, // 아이콘과 총 금액 사이의 간격 조정
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D6D6D',
    marginVertical: 10,
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFD580',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  listItemContent: {
    flex: 1,
    padding: 10,
  },
  listItemTitle: {
    fontSize: 17,
    color: '#333333',
    fontWeight: 'bold',
  },
  listItemDate: {
    fontSize: 13,
    color: '#AAAAAA',
  },
  listItemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeAmount: {
    color: '#0068FF', // 수입 항목 색상
  },
  expenseAmount: {
    color: '#E97072', // 지출 항목 색상
  },
});
