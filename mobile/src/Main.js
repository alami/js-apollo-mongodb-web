import React from 'react';
import Screens from './screens';

// Импортируем библиотеки Apollo
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
// Импортируем SecureStore для получения значения токена
import * as SecureStore from 'expo-secure-store';

// Импортируем конфигурацию среды
import getEnvVars from '../config';
const { API_URI } = getEnvVars();

// Настраиваем API URI и кэш
const uri = API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

// Возвращаем заголовки в контекст
const authLink = setContext(async (_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: (await SecureStore.getItemAsync('token')) || ''
        }
    };
});

// Настраиваем Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache
});

const Main=() => {
    // Оборачиваем приложение в компонент высшего порядка ApolloProvider
    return (
        <ApolloProvider client={client}>
            <Screens />
        </ApolloProvider>
    );
};

export default Main;
