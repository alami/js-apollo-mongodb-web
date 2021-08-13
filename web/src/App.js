import React from 'react';
import ReactDOM from 'react-dom';

// Импортируем маршруты
import Pages from '/pages';

const App=() =>{
    return (
        <div>
            <Pages />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));


