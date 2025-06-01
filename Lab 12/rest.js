const express = require('express');
const router = express.Router();
const { readData, saveData } = require('./store');
const path = require('path');

router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

router.get('/', (req, res) => {
    try {
        res.render('index', {
            title: 'Главная - Hotfix Café',
            isHome: true,
            isMenu: false,
            isFeedback: false
        });
    } catch (error) {
        console.error('Ошибка рендеринга главной страницы:', error);
        res.status(500).render('error', {
            title: 'Ошибка сервера',
            message: 'Не удалось загрузить главную страницу'
        });
    }
});
router.get('/admin/feedback', (req, res) => {
    try {
        const data = readData();
        res.render('admin-feedback', {
            title: 'Админ-панель: Отзывы',
            feedbacks: data.feedback,
            isAdmin: true
        });
    } catch (error) {
        console.error('Ошибка загрузки админ-панели:', error);
        res.status(500).render('error', {
            title: 'Ошибка сервера',
            message: 'Не удалось загрузить отзывы'
        });
    }
});
router.get('/menu', (req, res) => {
    try {
        const data = readData();
        res.render('menu', {
            title: 'Меню - Hotfix Café',
            menu: data.menu,
            desserts: data.desserts,
            drinks: data.drinks,
            isMenu: true
        });
    } catch (error) {
        console.error('Ошибка загрузки меню:', error);
        res.status(500).render('error', {
            title: 'Ошибка сервера',
            message: 'Не удалось загрузить меню'
        });
    }
});

router.get('/feedback', (req, res) => {
    try {
        const data = readData();
        res.render('feedback', {
            title: 'Отзывы - Hotfix Café',
            feedbacks: data.feedback.reverse(),
            isFeedback: true
        });
    } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
        res.status(500).render('error', {
            title: 'Ошибка',
            message: 'Не удалось загрузить отзывы'
        });
    }
});

router.get('/api/menu', (req, res) => {
    try {
        const data = readData();
        res.json({
            success: true,
            data: data.menu,
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('API Error (GET /api/menu):', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера при получении меню',
            error: error.message
        });
    }
});

router.post('/api/menu', (req, res) => {
    try {
        const { name, price, description } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({
                success: false,
                message: 'Не указано название или цена блюда'
            });
        }

        const data = readData();
        const newItem = {
            id: Date.now(),
            name,
            price: Number(price),
            description: description || '',
            createdAt: new Date().toISOString()
        };

        data.menu.push(newItem);
        saveData(data);

        res.status(201).json({
            success: true,
            data: newItem,
            message: 'Блюдо успешно добавлено'
        });
    } catch (error) {
        console.error('API Error (POST /api/menu):', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка при добавлении блюда',
            error: error.message
        });
    }
});

router.get('/api/feedback', (req, res) => {
    try {
        const data = readData();
        res.json({
            success: true,
            data: data.feedback,
            count: data.feedback.length
        });
    } catch (error) {
        console.error('API Error (GET /api/feedback):', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера при получении отзывов'
        });
    }
});

router.post('/api/feedback', (req, res) => {
    try {
        const { name, message, rating } = req.body;
        
        if (!name || !message) {
            return res.status(400).json({
                success: false,
                message: 'Укажите имя и сообщение'
            });
        }

        const data = readData();
        const newFeedback = {
            id: Date.now(),
            name,
            message,
            rating: Math.min(5, Math.max(1, parseInt(rating) || 5)),
            date: new Date().toLocaleString('ru-RU'),
            ip: req.ip
        };

        data.feedback.push(newFeedback);
        
        if (!saveData(data)) {
            throw new Error('Ошибка сохранения данных');
        }

        res.status(201).json({
            success: true,
            data: newFeedback
        });
    } catch (error) {
        console.error('Ошибка добавления отзыва:', error);
        res.status(500).json({
            success: false,
            message: 'Ошибка сервера'
        });
    }
});

router.use((req, res) => {
    res.status(404).render('error', {
        title: 'Страница не найдена',
        message: 'Запрошенная страница не существует'
    });
});

router.use((err, req, res, next) => {
    console.error('Глобальная ошибка API:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Внутренняя ошибка сервера',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = router;