import React from 'react';
import { Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';
// Запрос note, принимающий переменную ID
const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
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
const NoteScreen = props => {
    const id = props.navigation.getParam('id');
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    if (loading) return <Text>Loading</Text>;
    // В случае сбоя выдаем пользователю сообщение об ошибке
    if (error) return <Text>Error! Note not found</Text>;
    // В случае успеха передаем данные в компонент note
    return <Note note={data.note} />;
};

export default NoteScreen;
