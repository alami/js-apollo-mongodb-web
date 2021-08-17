import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Импортируем компоненты экрана
import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NoteScreen from './note';
// Стек навигации
const FeedStack = createStackNavigator({
    Feed: Feed,
    Note: NoteScreen
});
const MyStack = createStackNavigator({
    MyNotes: MyNotes,
    Note: NoteScreen
});
const FavStack = createStackNavigator({
    Favorites: Favorites,
    Note: NoteScreen
});
// Вкладки навигации
const TabNavigator = createBottomTabNavigator({
    FeedScreen: {
        screen: FeedStack,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="home" size={24} color={tintColor} />
            )
        }
    },
    MyNoteScreen: {
        screen: MyStack,
        navigationOptions: {
            tabBarLabel: 'My Notes',
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="notebook" size={24} color={tintColor} />
            )

        }
    },
    FavoriteScreen: {
        screen: FavStack,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            tabBarIcon: ({tintColor}) => (
                <MaterialCommunityIcons name="star" size={24} color={tintColor}/>
            )
        }
    }
});
// Создаем контейнер приложения
export default createAppContainer(TabNavigator);
