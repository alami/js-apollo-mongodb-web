import React from 'react';
import { FlatList, View, Text } from 'react-native';
import styled from 'styled-components/native';
// Фиктивные данные
const notes = [
    { id: 0, content: 'Giant Steps' },
    { id: 1, content: 'Tomorrow Is The Question' },
    { id: 2, content: 'Tonight At Noon' },
    { id: 3, content: 'Out To Lunch' },
    { id: 4, content: 'Green Street' },
    { id: 5, content: 'In A Silent Way' },
    { id: 6, content: 'Lanquidity' },
    { id: 7, content: 'Nuff Said' },
    { id: 8, content: 'Nova' },
    { id: 9, content: 'The Awakening' }
];
const NoteFeed = props => {
    return (
        <View>
            <FlatList
                data={notes}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => <Text>{item.content}</Text>}
            />
        </View>
    );
};
export default NoteFeed;
