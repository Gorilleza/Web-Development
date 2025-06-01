const express = require('express');
const path = require('path');
const restRouter = require('./rest');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', restRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ошибка сервера!');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});