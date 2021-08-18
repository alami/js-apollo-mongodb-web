import React from 'react';
import { useQuery, gql } from '@apollo/client';
import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

// Наш GraphQL-запрос
const GET_MY_NOTES = gql`
    query me {
        me{
            id
            username
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

const MyNotes = props => {
    const { loading, error, data } = useQuery(GET_MY_NOTES);
// Если данные загружаются, приложение будет выводить сообщение о загрузке
    if (loading) return <Loading />;
// Если при получении данных произошел сбой, выводим сообщение об ошибке
    if (error) return <Text>Error loading notes</Text>;
// Если запрос выполнен успешно и содержит заметки, возвращаем их в ленту
// Если же запрос выполнен успешно, но заметок не содержит, отображаем
// сообщение
    if (data.me .notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} navigation={props.navigation} />;
    }else{
        return <Text>No notes yet</Text>;
    }
};

MyNotes.navigationOptions = {
    title: 'My Notes'
};

export default MyNotes;
