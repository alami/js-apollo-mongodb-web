import React from 'react';
import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

import ReactMarkdown from 'react-markdown';
import { useQuery, gql } from '@apollo/client';

// Наш GraphQL-запрос, хранящийся в виде переменной
const GET_NOTES = gql`
    query NoteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
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
    }
`;

const Home=() =>{
    // Хук запроса
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    if (loading) return <p>Loading...</p>;
    // Если при получении данных произошел сбой, отображаем сообщение об ошибке
    if (error) return <p>Error!</p>;
    // Если загрузка данных произошла успешно, отображаем их в UI
    return <NoteFeed notes={data.noteFeed.notes} />;

};
export default Home;

