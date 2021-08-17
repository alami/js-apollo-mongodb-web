import React from 'react';

// Импортируем зависимости React Native и Apollo
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';

// Импортируем NoteFeed
import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

const GET_NOTES = gql`
    query notes {
        notes {
            id
            createdAt
            content
            favoriteCount
            author {
                username
                id
                avatar
            }
        }
    }
`;

const Feed = props => {
    const { loading, error, data } = useQuery(GET_NOTES);
    // Если данные загружаются, приложение будет показывать индикатор загрузки
    if (loading) return <Text>Loading</Text>;
    // Если при получении данных произошел сбой, выдаем сообщение об ошибке
    if (error) return <Text>Error loading notes</Text>;
    // Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту
    return <NoteFeed notes={data.notes} navigation={props.navigation} />;
};

Feed.navigationOptions = {
    title: 'Feed'
};
export default Feed;
