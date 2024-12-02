// //CategoryDetails.js
// import React, { useState, useEffect, useContext } from 'react';
// import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, Platform, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { UserContext } from '../context/UserContext';

// function CategoryDetails({ route, navigation }) {
//     const { categoryName } = route.params;
//     const { userId } = useContext(UserContext);
//     const [transactions, setTransactions] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const categoryIcons = {
//         '식비': require('../../assets/icons/food.png'),
//         '쇼핑': require('../../assets/icons/shopping.png'),
//         '카페': require('../../assets/icons/cafe.png'),
//         '편의점': require('../../assets/icons/store.png'),
//         '이체': require('../../assets/icons/transfer.png'),
//         '기타': require('../../assets/icons/etc.png')
//     };

//     useEffect(() => {
//         setTransactions([]);
//         setLoading(true);

//         const fetchTransactions = async () => {
//             console.log('=== Fetching Transactions Start ===');
//             console.log('Looking for category:', categoryName);
//             console.log('Current UserID : ', userId);
            
//             try {
//                 let allTransactions = [];
//                 const testDates = ['2024-01-01', '2024-02-10'];
//                 console.log('Test dates:', testDates);

//                 for (const dateString of testDates) {
//                     console.log(`\n--- Checking date: ${dateString} ---`);

//                     // income 데이터 확인
//                     console.log('Checking income transactions...');
//                     const incomeDoc = await firestore()
//                         .collection('Users')
//                         .doc(userId)
//                         .collection(dateString)
//                         .doc('income')
//                         .get({ source: 'server' });
                    
//                     if (incomeDoc.exists) {
//                         const incomeData = incomeDoc.data();
//                         console.log('Income data found:', incomeData);
                        
//                         if (incomeData.transactions) {
//                             incomeData.transactions.forEach((transaction, index) => {
//                                 console.log(`Checking income transaction ${index}:`, transaction);
//                                 if (transaction.category === categoryName) {
//                                     console.log('Matching income transaction found!');
//                                     allTransactions.push({
//                                         id: `income-${dateString}-${index}`,
//                                         ...transaction,
//                                         date: dateString,
//                                         type: 'income'
//                                     });
//                                 }
//                             });
//                         }
//                     } else {
//                         console.log('No income document found for this date');
//                     }

//                     // outcome 데이터 확인
//                     console.log('\nChecking outcome transactions...');
//                     const outcomeDoc = await firestore()
//                         .collection('Users')
//                         .doc(userId)
//                         .collection(dateString)
//                         .doc('outcome')
//                         .get({ source: 'server' });

//                     if (outcomeDoc.exists) {
//                         const outcomeData = outcomeDoc.data();
//                         console.log('Outcome data found:', outcomeData);
                        
//                         if (outcomeData.transactions) {
//                             outcomeData.transactions.forEach((transaction, index) => {
//                                 console.log(`Checking outcome transaction ${index}:`, transaction);
//                                 if (transaction.category === categoryName) {
//                                     console.log('Matching outcome transaction found!');
//                                     allTransactions.push({
//                                         id: `outcome-${dateString}-${index}`,
//                                         ...transaction,
//                                         date: dateString,
//                                         type: 'outcome'
//                                     });
//                                 }
//                             });
//                         }
//                     } else {
//                         console.log('No outcome document found for this date');
//                     }
//                 }

//                 console.log('\n=== Processing Results ===');
//                 console.log('Total transactions found:', allTransactions.length);
                
//                 // 날짜순으로 정렬
//                 allTransactions.sort((a, b) => {
//                     const dateTimeA = new Date(`${a.date} ${a.time}`);
//                     const dateTimeB = new Date(`${b.date} ${b.time}`);
//                     return dateTimeB - dateTimeA;
//                 });

//                 console.log('Sorted transactions:', allTransactions);
//                 setTransactions(allTransactions);

//             } catch (error) {
//                 console.error('Error fetching transactions:', error);
//                 console.log('Error details:', error.message);
//             } finally {
//                 console.log('=== Fetch Complete ===');
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();

//         return () => {
//             setTransactions([]);
//             setLoading(true);
//         };

//     }, [userId, categoryName]);

//     // UI 렌더링 시에도 상태 확인을 위한 로그 추가
//     useEffect(() => {
//         console.log('Current transactions state:', transactions);
//     }, [transactions]);

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const month = date.getMonth() + 1;
//         const day = date.getDate();
//         return `${month}월 ${day}일`;
//     };

//     let currentDisplayMonth = null;

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* 이전 UI 코드와 동일 */}
//             <StatusBar barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'} backgroundColor="#FFF7EA"/>
            
//             <View style={styles.headerContainer}>
//                 <TouchableOpacity 
//                     style={styles.backButton}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Text style={styles.backButtonText}>←</Text>
//                 </TouchableOpacity>
//             </View>
            
//             <Text style={styles.title}>{categoryName}</Text>

//             <ScrollView style={styles.scrollContainer}>
//                 {loading ? (
//                     <Text style={styles.centerText}>Loading...</Text>
//                 ) : transactions.length === 0 ? (
//                     <Text style={styles.centerText}>None</Text>
//                 ) : (
//                     transactions.map((transaction) => {
//                         const transactionDate = new Date(`${transaction.date} ${transaction.time}`);
//                         const month = transactionDate.getMonth() + 1;
                        
//                         const monthChanged = currentDisplayMonth !== month;
//                         if (monthChanged) {
//                             currentDisplayMonth = month;
//                         }

//                         return (
//                             <React.Fragment key={transaction.id}>
//                                 {monthChanged && (
//                                     <View style={styles.monthSection}>
//                                         <Text style={styles.monthTitle}>{month}월</Text>
//                                     </View>
//                                 )}
//                                 <View style={styles.transactionItem}>
//                                     <View style = {styles.iconContainer}>
//                                         <Image source = {categoryIcons[transaction.category]} style = {styles.categoryIcons}/>
//                                     </View>
                                    
//                                     <View style={styles.leftContent}>
//                                         <Text style={styles.transactionTitle}>{transaction.memo}</Text>
//                                         <Text style={styles.transactionTime}>
//                                             {transaction.time} - {formatDate(transaction.date)}
//                                         </Text>
//                                     </View>
//                                     <Text style={[
//                                         styles.transactionAmount,
//                                         {color: transaction.type === 'income' ? '#0068FF' : '#E97072'}
//                                     ]}>
//                                         {transaction.type === 'income' ? '+' : ' '}
//                                         {transaction.money?.toLocaleString()}
//                                     </Text>
//                                 </View>
//                             </React.Fragment>
//                         );
//                     })
//                 )}
//             </ScrollView>
//         </SafeAreaView>
//     );
// }


// const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFF7EA',
//     },
//     headerContainer: {
//         position: 'absolute',
//         top: Platform.OS === 'ios' ? height * 0.08 : height * 0.02,
//         left: width * 0.05,
//         zIndex: 1,
//     },
//     backButton: {
//         top: width * -0.05,
//         padding: width * 0.02,
//         justifyContent: 'center',
//         alignItems: 'center',
//         zIndex: 1,
//         marginLeft: width * 0.001,
//         marginTop: height * 0.009,
//     },
//     backButtonText: {
//         fontSize: width * 0.06,
//         color: '#000000',
//     },
//     title: {
//         top: height * 0.025,
//         position: 'absolute',
//         width: '100%',
//         textAlign: 'center',
//         fontSize: Platform.OS === 'ios' ? width * 0.07 : width * 0.045,
//         fontWeight: '800',
//         color: '#000000',
//         fontFamily: 'Pridi-Bold',
//         paddingRight: width * 0.1,
//         left: width * 0.05,
//     },
//     scrollContainer: {
//         flex: 1,
//         marginTop: height * 0.12,
//     },
//     centerText: {
//         textAlign: 'center',
//         marginTop: height * 0.3,
//         fontSize: width * 0.05,
//         color: '#666',
//     },
//     monthSection: {
//         marginBottom: height * -0.005,
//         paddingHorizontal: width * 0.05,

//     },
//     monthTitle: {
//         fontSize: width * 0.04,
//         fontWeight: '600',
//         marginBottom: height * 0.01,
//         color: '#000',
//         marginLeft: width * 0.045,
//     },
//     transactionItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingVertical: height * 0.015,
//         marginLeft: width * 0.2,
//     },
//     leftContent: {
//         flex: 1,
//     },
//     iconContainer: {
//         width: width * 0.17,
//         height: width * 0.17, 
//         backgroundColor: '#FFD38B',
//         borderRadius: height * 0.015,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: width * -0.12,
//         marginRight: width * 0.04,
//     },
//     categoryIcons: {
//         width: width * 0.1,
//         height: width * 0.1, 
//         resizeMode: 'contain',
//         tintColor: '#FFF7EA',
//     },
//     transactionTitle: {
//         fontSize: width * 0.04,
//         fontWeight: '500',
//         color: '#000',
//         marginBottom: height * 0.005,
//     },
//     transactionTime: {
//         fontSize: width * 0.03,
//         fontWeight: '600',
//         color: '#0068FF',
//     },
//     transactionAmount: {
//         fontSize: width * 0.04,
//         fontWeight: '600',
//         color: '#2196F3',
//         marginRight: width * 0.08
//     },
// });

// export default CategoryDetails;

//CategoryDetails.js
import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, Platform, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { UserContext } from '../context/UserContext';

function CategoryDetails({ route, navigation }) {
    const { categoryName } = route.params;
    const { userId } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryIcons = {
        '식비': require('../../assets/icons/food.png'),
        '쇼핑': require('../../assets/icons/shopping.png'),
        '카페': require('../../assets/icons/cafe.png'),
        '편의점': require('../../assets/icons/store.png'),
        '이체': require('../../assets/icons/transfer.png'),
        '기타': require('../../assets/icons/etc.png')
    };

    useEffect(() => {
        setTransactions([]);
        setLoading(true);

        const fetchTransactions = async () => {
            console.log('=== Fetching Transactions Start ===');
            console.log('Looking for category:', categoryName);
            console.log('Current UserID : ', userId);
            
            try {
                // 먼저 사용자의 availableDates를 가져옴
                const userDoc = await firestore()
                    .collection('Users')
                    .doc(userId)
                    .get({ source: 'server' });

                if (!userDoc.exists) {
                    console.log('User document not found');
                    return;
                }

                const userData = userDoc.data();
                const availableDates = userData.availableDates || [];
                let allTransactions = [];
                
                console.log('Available dates:', availableDates);

                // availableDates의 각 날짜에 대해 데이터 조회
                for (const dateString of availableDates) {
                    console.log(`\n--- Checking date: ${dateString} ---`);

                    // income 데이터 확인
                    console.log('Checking income transactions...');
                    const incomeDoc = await firestore()
                        .collection('Users')
                        .doc(userId)
                        .collection(dateString)
                        .doc('income')
                        .get({ source: 'server' });
                    
                    if (incomeDoc.exists) {
                        const incomeData = incomeDoc.data();
                        console.log('Income data found:', incomeData);
                        
                        if (incomeData.transactions) {
                            incomeData.transactions.forEach((transaction, index) => {
                                console.log(`Checking income transaction ${index}:`, transaction);
                                if (transaction.category === categoryName) {
                                    console.log('Matching income transaction found!');
                                    allTransactions.push({
                                        id: `income-${dateString}-${index}`,
                                        ...transaction,
                                        date: dateString,
                                        type: 'income'
                                    });
                                }
                            });
                        }
                    } else {
                        console.log('No income document found for this date');
                    }

                    // outcome 데이터 확인
                    console.log('\nChecking outcome transactions...');
                    const outcomeDoc = await firestore()
                        .collection('Users')
                        .doc(userId)
                        .collection(dateString)
                        .doc('outcome')
                        .get({ source: 'server' });

                    if (outcomeDoc.exists) {
                        const outcomeData = outcomeDoc.data();
                        console.log('Outcome data found:', outcomeData);
                        
                        if (outcomeData.transactions) {
                            outcomeData.transactions.forEach((transaction, index) => {
                                console.log(`Checking outcome transaction ${index}:`, transaction);
                                if (transaction.category === categoryName) {
                                    console.log('Matching outcome transaction found!');
                                    allTransactions.push({
                                        id: `outcome-${dateString}-${index}`,
                                        ...transaction,
                                        date: dateString,
                                        type: 'outcome'
                                    });
                                }
                            });
                        }
                    } else {
                        console.log('No outcome document found for this date');
                    }
                }

                console.log('\n=== Processing Results ===');
                console.log('Total transactions found:', allTransactions.length);
                
                // 날짜순으로 정렬
                allTransactions.sort((a, b) => {
                    const dateTimeA = new Date(`${a.date} ${a.time}`);
                    const dateTimeB = new Date(`${b.date} ${b.time}`);
                    return dateTimeB - dateTimeA;
                });

                console.log('Sorted transactions:', allTransactions);
                setTransactions(allTransactions);

            } catch (error) {
                console.error('Error fetching transactions:', error);
                console.log('Error details:', error.message);
            } finally {
                console.log('=== Fetch Complete ===');
                setLoading(false);
            }
        };

        fetchTransactions();

        return () => {
            setTransactions([]);
            setLoading(true);
        };

    }, [userId, categoryName]);

    // UI 렌더링 시에도 상태 확인을 위한 로그 추가
    useEffect(() => {
        console.log('Current transactions state:', transactions);
    }, [transactions]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${month}월 ${day}일`;
    };

    let currentDisplayMonth = null;

    return (
        <SafeAreaView style={styles.container}>
            {/* 이전 UI 코드와 동일 */}
            <StatusBar barStyle={Platform.OS == 'ios' ? 'dark-content' : 'light-content'} backgroundColor="#FFF7EA"/>
            
            <View style={styles.headerContainer}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={styles.title}>{categoryName}</Text>

            <ScrollView style={styles.scrollContainer}>
                {loading ? (
                    <Text style={styles.centerText}>Loading...</Text>
                ) : transactions.length === 0 ? (
                    <Text style={styles.centerText}>None</Text>
                ) : (
                    transactions.map((transaction) => {
                        const transactionDate = new Date(`${transaction.date} ${transaction.time}`);
                        const month = transactionDate.getMonth() + 1;
                        
                        const monthChanged = currentDisplayMonth !== month;
                        if (monthChanged) {
                            currentDisplayMonth = month;
                        }

                        return (
                            <React.Fragment key={transaction.id}>
                                {monthChanged && (
                                    <View style={styles.monthSection}>
                                        <Text style={styles.monthTitle}>{month}월</Text>
                                    </View>
                                )}
                                <View style={styles.transactionItem}>
                                    <View style = {styles.iconContainer}>
                                        <Image source = {categoryIcons[transaction.category]} style = {styles.categoryIcons}/>
                                    </View>
                                    
                                    <View style={styles.leftContent}>
                                        <Text style={styles.transactionTitle}>{transaction.memo}</Text>
                                        <Text style={styles.transactionTime}>
                                            {transaction.time} - {formatDate(transaction.date)}
                                        </Text>
                                    </View>
                                    <Text style={[
                                        styles.transactionAmount,
                                        {color: transaction.type === 'income' ? '#0068FF' : '#E97072'}
                                    ]}>
                                        {transaction.type === 'income' ? '+' : ' '}
                                        {transaction.money?.toLocaleString()}
                                    </Text>
                                </View>
                            </React.Fragment>
                        );
                    })
                )}
            </ScrollView>
        </SafeAreaView>
    );
}


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EA',
    },
    headerContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? height * 0.08 : height * 0.02,
        left: width * 0.05,
        zIndex: 1,
    },
    backButton: {
        top: width * -0.05,
        padding: width * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        marginLeft: width * 0.001,
        marginTop: height * 0.009,
    },
    backButtonText: {
        fontSize: width * 0.06,
        color: '#000000',
    },
    title: {
        top: height * 0.025,
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        fontSize: Platform.OS === 'ios' ? width * 0.07 : width * 0.045,
        fontWeight: '800',
        color: '#000000',
        fontFamily: 'Pridi-Bold',
        paddingRight: width * 0.1,
        left: width * 0.05,
    },
    scrollContainer: {
        flex: 1,
        marginTop: height * 0.12,
    },
    centerText: {
        textAlign: 'center',
        marginTop: height * 0.3,
        fontSize: width * 0.05,
        color: '#666',
    },
    monthSection: {
        marginBottom: height * -0.005,
        paddingHorizontal: width * 0.05,

    },
    monthTitle: {
        fontSize: width * 0.04,
        fontWeight: '600',
        marginBottom: height * 0.01,
        color: '#000',
        marginLeft: width * 0.045,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: height * 0.015,
        marginLeft: width * 0.2,
    },
    leftContent: {
        flex: 1,
    },
    iconContainer: {
        width: width * 0.17,
        height: width * 0.17, 
        backgroundColor: '#FFD38B',
        borderRadius: height * 0.015,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * -0.12,
        marginRight: width * 0.04,
    },
    categoryIcons: {
        width: width * 0.1,
        height: width * 0.1, 
        resizeMode: 'contain',
        tintColor: '#FFF7EA',
    },
    transactionTitle: {
        fontSize: width * 0.04,
        fontWeight: '500',
        color: '#000',
        marginBottom: height * 0.005,
    },
    transactionTime: {
        fontSize: width * 0.03,
        fontWeight: '600',
        color: '#0068FF',
    },
    transactionAmount: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#2196F3',
        marginRight: width * 0.08
    },
});

export default CategoryDetails;