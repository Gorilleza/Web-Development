const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/download-menu', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'menu.json');
    res.download(filePath, 'cafe-menu.json', (err) => {
        if (err) {
            console.error('Ошибка загрузки файла:', err);
            res.status(500).send('Не удалось загрузить файл меню');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});