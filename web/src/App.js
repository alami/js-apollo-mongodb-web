import React from 'react';
import ReactDOM from 'react-dom';

// Импортируем библиотеки Apollo Client
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';   //из Apollo-пакета

const uri = process.env.API_URI;  // Настраиваем API URI и кэш
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

// Проверяем наличие токена и возвращаем заголовки в контекст
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// Создаем клиент Apollo
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});
// Проверяем наличие локального токена
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};
// Записываем данные кэша при начальной загрузке
cache.writeData({ data });

// Импортируем глобальные стили
import GlobalStyle from '/components/GlobalStyle';
// Импортируем маршруты
import Pages from '/pages';

const App=() =>{
    return (
        <ApolloProvider client={client}>
        <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));


