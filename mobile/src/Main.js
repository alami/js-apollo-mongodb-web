import React from 'react';
import Screens from './screens';

// Импортируем библиотеки Apollo
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// Импортируем конфигурацию среды
import getEnvVars from '../config';
const { API_URI } = getEnvVars();

// Настраиваем API URI и кэш
const uri = API_URI;
const cache = new InMemoryCache();

// Настраиваем Apollo Client
const client = new ApolloClient({
    uri,
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
