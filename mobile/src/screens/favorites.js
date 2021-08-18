import React from 'react';
import { Text, View } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

// Наш GraphQL-запрос
const GET_MY_FAVORITES = gql`
    query me {
        me{
            id
            username
            favorites {
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
    }
`;

const Favorites = props => {
    const { loading, error, data } = useQuery(GET_MY_FAVORITES);
    // Если данные загружаются, выдаем сообщение о загрузке
    if (loading) return <Loading />;
    // Если при получении данных произошел сбой, выдаем сообщение об ошибке
    if (error) return <Text>Error loading notes</Text>;
    // Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту
    // Если запрос выполнен успешно, но заметок не содержит, отображаем сообщение
    if (data.me .favorites.length !== 0) {
        return <NoteFeed notes={data.me.favorites} navigation={props.navigation} />;
    }else{
        return <Text>No notes yet</Text>;
    }
};

Favorites.navigationOptions = {
    title: 'Favorites'
};

export default Favorites;
