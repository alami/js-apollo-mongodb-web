import React, { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Loading from '../components/Loading';

const AuthLoadingScreen = props => {
    const checkLoginState = async () => {
        // Извлекаем значение токена
        const userToken = await SecureStore.getItemAsync('token');
        // Если токен найден, переходим на экран приложения
        // В противном случае переходим на экран авторизации
        console.log(userToken)
        props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    // Вызываем checkLoginState, как только компонент установится
    useEffect(() => {
        checkLoginState();
    });
    return <Loading />;
};

export default AuthLoadingScreen;
