import React, { useState } from 'react';

function Sparkle() {
const [sparkle, addSparkle] = useState('');
     // ^--начальное состояние компонента через переменную 'sparkle', являющуюся пустой строкой
              //  ^--функцию 'addSparkle', которую будем вызывать в обрабочике кликов Кнопки
    return (
        <div>
            <button onClick={() => addSparkle(sparkle + '\u2728')}>
                Add some sparkle
            </button>

            <p>{sparkle}</p>
        </div>
    );

}
export default Sparkle;
