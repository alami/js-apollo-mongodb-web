const express = require('express');
const helmet = require('helmet')
const cors = require('cors');
const { ApolloServer} = require('apollo-server-express');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

require('dotenv').config();

const db = require('./db');               // Импортируем локальные модули
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
app.use(helmet());
app.use(cors());
db.connect(DB_HOST);

const jwt = require('jsonwebtoken');

const getUser = token => {  // Получаем информацию пользователя из JWT
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET); // Возвращаем информацию пользователя из токена
        } catch (err) {
            new Error('Session invalid'); // Если с токеном возникла проблема, выбрасываем ошибку
        }
    }
};


const server = new ApolloServer({    // Настраиваем Apollo Server
    typeDefs,
    resolvers,
    validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
    context: ({req}) => {
        const token = req.headers.authorization; // Получаем токен пользователя из заголовков
        const user = getUser(token);         // Пытаемся извлечь пользователя с помощью токена
        console.log(user);    // Пока что будем выводить информацию о пользователе в консоль:
        return { models, user };             // Добавляем модели БД и пользователя в context
    }
});
server.applyMiddleware({ app, path: '/api' });
app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
    )
);
