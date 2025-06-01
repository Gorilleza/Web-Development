import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, switchMap, catchError } from 'rxjs/operators';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  
  // Создаем Observable из события submit формы
  const formSubmit$ = fromEvent(form, 'submit').pipe(
    // Предотвращаем действие по умолчанию
    map(event => {
      event.preventDefault();
      return event;
    }),
    // Преобразуем данные формы в объект
    map(event => ({
      name: event.target.name.value,
      message: event.target.message.value,
      rating: parseInt(event.target.rating.value)
    })),
    // Отправляем данные на сервер
    switchMap(formData => 
      ajax({
        url: '/api/feedback',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).pipe(
        // Обрабатываем успешный ответ
        map(response => {
          if (response.response.success) {
            alert('Спасибо за ваш отзыв!');
            form.reset();
            window.location.reload();
          } else {
            alert('Ошибка: ' + (response.response.message || 'Неизвестная ошибка'));
          }
          return response;
        }),
        // Обрабатываем ошибки
        catchError(error => {
          console.error('Ошибка:', error);
          alert('Произошла ошибка при отправке отзыва');
          return error;
        })
      )
    )
  );

  // Подписываемся на Observable
  formSubmit$.subscribe();
});