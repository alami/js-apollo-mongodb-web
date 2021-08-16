import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';

import { useQuery, gql } from '@apollo/client';
// Импортируем Link и withRouter из React Router
import { Link, withRouter } from 'react-router-dom';
// Импортируем компонент ButtonAsLink
import ButtonAsLink from './ButtonAsLink';

// Локальный запрос
const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;
const UserState = styled.div` 
  margin-left: auto; 
`;

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;
const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const Header = props => {
    // Хук запроса для проверки состояния авторизации пользователя
    const { data, client } = useQuery(IS_LOGGED_IN);

    return (
        <HeaderBar>
            <img src={logo} alt="Notedly Logo" height="40" />
            <LogoText>Notedly</LogoText>
            {/* Если авторизован, отображаем ссылку logout, иначе sign in и sign up */}
            <UserState>
                {data.isLoggedIn ? (
                    <ButtonAsLink
                        onClick={() => {
localStorage.removeItem('token');// Удаляем токен
client.resetStore();                 // Очищаем кэш приложения
client.writeData({ data: { isLoggedIn: false } });// Обновляем локальное состояние
props.history.push('/');             // Перенаправляем пользователя на домашнюю страницу
                        }}
                    >Log Out</ButtonAsLink>
                ):(
                    <p>
                        <Link to={ '/signin'}>Sign In</Link> or{' '}
                        <Link to={ '/signup'}>Sign Up</Link>
                    </p>
                )}
            </UserState>
        </HeaderBar>
    );
};
export default Header;
