//BudgetSettingScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveBudgetToFirebase } from '../firebase'; // Firebase 설정 파일 import
import Header from '../components/common/Header';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // UserContext 가져오기

const BudgetSettingScreen = () => {
    const [date, setDate] = useState('');
    const [targetBudget, setTargetBudget] = useState('');

    const { userId } = useContext(UserContext); // userId 가져오기

    const handleSave = async () => {
        console.log('현재 상태:', { date, targetBudget });

        // 값이 비어있는지 체크
        if (!date || !targetBudget) {
            Alert.alert('오류', '값을 입력해주세요.');
            return;
        }

        // 날짜 형식 검증 (YYYY-MM)
        if (!/^\d{4}-\d{2}$/.test(date)) {
            Alert.alert('오류', '날짜 형식은 YYYY-MM이어야 합니다.');
            return;
        }

        // 목표 예산이 숫자인지 확인
        const budgetNumber = parseInt(targetBudget, 10);
        if (isNaN(budgetNumber) || budgetNumber <= 0) {
            Alert.alert('오류', '목표 예산은 양수의 숫자여야 합니다.');
            return;
        }

        // Firebase에 저장
        try {
            await saveBudgetToFirebase(userId, date, targetBudget);  // Firebase 저장 함수 호출
            setTimeout(() => {
                Alert.alert('저장 완료', `날짜: ${date}, 목표 예산: ${targetBudget}`);
            }, 0);
        } catch (error) {
            Alert.alert('저장 실패', '예산을 저장하는 데 오류가 발생했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            {/* 헤더 */}
        <Header title="예산 설정" backgroundColor="#FFD38B" marginRight={30} />

            <View style={styles.box}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date</Text>
                    <TextInput
                        style={styles.input}
                        value={date}
                        onChangeText={setDate}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>목표 예산</Text>
                    <TextInput
                        style={styles.input}
                        value={targetBudget}
                        onChangeText={setTargetBudget}
                        keyboardType="numeric"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>저장</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFD38B',
        padding: 20,
        justifyContent: 'flex-start',
    },

    headerContainer: {
        flexDirection: 'row', // 텍스트와 이미지를 가로로 배치
        justifyContent: 'center', // 양 끝으로 정렬
        alignItems: 'center', // 세로 정렬
        marginTop: 60,
        //backgroundColor:"orange",
    },

    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3D5C7A',
        //textAlign: 'center', // 텍스트 가운데 정렬
        //justifyContent:'center',
        //alignSelf: 'center', // 뷰 자체를 부모 안에서 가운데 정렬
        marginBottom: 10,
    },
    box: {
        flex: 1,
        backgroundColor: '#FFF7EA',
        borderRadius: 30,
        padding: 20,
        maxHeight: '60%',
        marginTop: 40,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#3D5C7A',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderRadius: 30,
        paddingHorizontal: 15,
        backgroundColor: '#F1DFC3',
        fontSize: 18,
    },
    button: {
        backgroundColor: '#FFD38B',
        paddingVertical: 20,
        paddingHorizontal: 60,
        borderRadius: 30,
        alignItems: 'center',
        maxWidth: 150,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#3D5C7A',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BudgetSettingScreen;