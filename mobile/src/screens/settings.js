import React from 'react';
import { View, Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
const Settings = props => {
    // Удаляем токен и переходим на экран авторизации
    const signOut = () => {
        SecureStore.deleteItemAsync('token') .then(
            props.navigation.navigate('Auth')
        );
    };
    return (
        <View>
            <Text> | </Text>
            <Text> | </Text>
            <Text> | </Text>
            <Text> | </Text>
            <Text> | </Text>
            <Text> | </Text>
            <Button style={{margin: 30}} title="Sign Out" onPress={signOut} />
        </View>
    );
};
Settings.navigationOptions = {
    title: 'Settings'
};
export default Settings;
