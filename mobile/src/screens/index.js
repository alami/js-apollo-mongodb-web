import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

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
            tabBarLabel: 'Feed'
        }
    },
    MyNoteScreen: {
        screen: MyStack,
        navigationOptions: {
            tabBarLabel: 'My Notes'
        }
    },
    FavoriteScreen: {
        screen: FavStack,
        navigationOptions: {
            tabBarLabel: 'Favorites'
        }
    }
});
// Создаем контейнер приложения
export default createAppContainer(TabNavigator);
