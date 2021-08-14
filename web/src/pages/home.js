import React from 'react';
import Button from '../components/Button';
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

    return (
        <div>
            {console.log(data)}
            {data.noteFeed.notes.map(note => (
                <article key={note.id}>
                    <img
                        src={note.author.avatar}
                        alt={`${note.author.username} avatar`}
                        height="50px"
                    />{' '}
                    {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
                    <ReactMarkdown source={note.content} />
                </article>
            ))}
            <Button>Click me!</Button>
        </div>
    );
};
export default Home;

