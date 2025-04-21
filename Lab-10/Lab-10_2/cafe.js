let menu = {};

function AddDish(dishName, description) {
    menu[dishName] = description;
}

function DeleteDish(dishName) {
    if (menu.hasOwnProperty(dishName)) {
        delete menu[dishName];
        return `Блюдо "${dishName}" удалено из меню.`;
    } else {
        return `Блюдо "${dishName}" не найдено в меню.`;
    }
}

function GetDishInfo(dishName) {
    if (menu.hasOwnProperty(dishName)) {
        return `Блюдо: ${dishName}\nОписание: ${menu[dishName]}`;
    } else {
        return `Нет информации о блюде "${dishName}".`;
    }
}

function ListDishes() {
    let result = "Меню:\n";
    for (let dish in menu) {
        result += `Блюдо: ${dish}\nОписание: ${menu[dish]}\n\n`;
    }
    return result.trim();
}