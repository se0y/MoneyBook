import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const NotificationScreen = ({ route }) => {
  const navigation = useNavigation();
  const [translateX] = useState(new Animated.Value(width)); // Animation initial state
  const [notifications, setNotifications] = useState([
    { id: 1, message: '8월 설정 예산의 90%를 사용하셨어요', date: '2024.08.20' },
    { id: 2, message: '8월 설정 예산의 50%를 사용하셨어요', date: '2024.08.14' },
  ]);

  // Start slide-in animation when screen loads
  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: width * 0.2, // 80% of the screen width
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      {/* Dismiss on outside press */}
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <View style={styles.container}>
            <Text style={styles.header}>알림 내역</Text>
            <ScrollView>
              {notifications.map((notification) => (
                <TouchableOpacity
                  key={notification.id}
                  style={styles.notificationBox}
                  onPress={() => handleDelete(notification.id)}
                >
                  <Text style={styles.alert}>경고</Text>
                  <Text style={styles.message}>{notification.message}</Text>
                  <Text style={styles.date}>{notification.date}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background
    justifyContent: 'flex-end', // Align the notification screen to the right

  },
  animatedContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '100%', // 80% of the screen width
    backgroundColor: '#FFF',
    elevation: 5, // Shadow for the box
     borderRadius: 20,

  },
  container: {
    flex: 1,
    backgroundColor: '#D9C9B6',
    padding: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B3D3A',
  },
  notificationBox: {
    backgroundColor: '#F5F0E1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  alert: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B5A2B',
  },
  message: {
    fontSize: 16,
    color: '#4B3D3A',
  },
  date: {
    fontSize: 12,
    color: '#A89A8D',
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#8B5A2B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;
