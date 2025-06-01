const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

function readData() {
    try {
        const rawData = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        const defaultData = {
            menu: [],
            desserts: [],
            drinks: [],
            feedback: []
        };
        saveData(defaultData);
        return defaultData;
    }
}

function saveData(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Ошибка сохранения данных:', error);
        return false;
    }
}

module.exports = { readData, saveData };