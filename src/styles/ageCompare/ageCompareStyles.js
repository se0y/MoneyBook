import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD38B',
  },
  roundedContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF7EA',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 20, // 헤더와 간격
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#5A5A5A',
  },

  chartWrapper: {
    paddingLeft: 20,
    marginTop: 40,

//    justifyContent: 'center',
//    alignItems: 'center',
  },


  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    width: 180,
    height: 50,
    backgroundColor: '#FFD38B',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#5A5A5A',
    marginBottom: 5,
  },
  myExpense: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A2845E',
  },
  peerExpense: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E97072',
  },
  lineIcon: {
    marginHorizontal: 10,
  },
  note: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: '#5A5A5A',
  },
});
