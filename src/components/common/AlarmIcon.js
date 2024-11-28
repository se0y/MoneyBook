
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; // FontAwesome 아이콘 라이브러리
import { faBell } from '@fortawesome/free-solid-svg-icons'; // 알람 아이콘 가져오기
import styles from '../../styles/common/menuIconStyles';

const AlarmIcon = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <FontAwesomeIcon icon={faBell} size={27} color="#000" /> {/* "bars" 아이콘 사용 */}
    </TouchableOpacity>
  );
};

export default AlarmIcon;
