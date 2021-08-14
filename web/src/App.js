import React from 'react';
import ReactDOM from 'react-dom';

// Импортируем библиотеки Apollo Client
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
const uri = process.env.API_URI;  // Настраиваем API URI и кэш
const cache = new InMemoryCache();
const client = new ApolloClient({ // Настраиваем Apollo Client
    uri,
    cache,
    connectToDevTools: true
});

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


