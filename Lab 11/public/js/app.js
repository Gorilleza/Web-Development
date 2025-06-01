document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedbackForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.name.value,
            message: form.message.value,
            rating: parseInt(form.rating.value)
        };

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            if (result.success) {
                alert('Спасибо за ваш отзыв!');
                form.reset();
                location.reload();
            } else {
                alert('Ошибка: ' + result.message);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке отзыва');
        }
    });
});