import React from 'react';
import Button from '../components/Button';
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

    return (
        <div>
            {console.log(data)}
            <p>The data loaded!</p>
            <Button>Click me!</Button>
        </div>
    );
};
export default Home;

