import React from 'react';
import ReactDOM from 'react-dom';

// Импортируем глобальные стили
import GlobalStyle from '/components/GlobalStyle';
// Импортируем маршруты
import Pages from '/pages';

const App=() =>{
    return (
        <div>
            <GlobalStyle />
            <Pages />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));


