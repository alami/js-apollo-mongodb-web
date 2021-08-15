import React, {useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import styled from 'styled-components';

import Button from '../components/Button';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;
const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }
  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

// Добавляем props, передаваемый в компонент для дальнейшего использования
const SignUp = props => {
    // Устанавливаем состояние формы по умолчанию
    const [values, setValues] = useState();
    // Обновляем состояние при вводе пользователем данных
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };
    useEffect(() => {
    // Обновляем заголовок документа
        document.title = 'Sign Up — Notedly';
    });

    //Добавляем хук мутации
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // Когда мутация завершена, выводим в консоль JSON Web Token
            console.log(data.signUp);
        }
    });

    return (
        <Wrapper>
            <h2>Sign Up</h2>
            <Form onSubmit={event => {
                event.preventDefault();
                console.log(values);
                signUp({
                    variables: {
                        ...values
                    }
                  });
                }}
                >
                <label htmlFor="username">Username:</label>
                <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={onChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Wrapper>
    );
};
export default SignUp;
