// Импортируем утилиту форматирования из 'date-fns`
import { format } from 'date-fns';
// Обновляем разметку даты, чтобы привести ее в формат Месяц, День, Год
{format(note.createdAt, 'MMM Do YYYY')} Favorites:{' '}
