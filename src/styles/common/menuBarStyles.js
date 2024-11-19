// src/styles/common/menuBarStyles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  menuContainer: {
    flex: 1,
    backgroundColor: '#276749',
    width: '78%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    marginBottom: 10,
  },
  userText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  userSubText: {
    fontSize: 14,
    color: '#d9f5e5',
    textAlign: 'center',
    marginTop: 5,
  },
  menuList: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
});
