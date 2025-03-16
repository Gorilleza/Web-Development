let menu={};

function AddDish(dishName,description){
    menu[dishName]=description
}

function DeleteDish(dishName){
    if (menu.hasOwnProperty(dishName)){
        delete menu[dishName];
        return 'Блюдо "${dishName}" удалено из меню.';
    } else {
        return 'Блюдо "${dishName}" не найдено в меню.';
    }
}
function GetDishInfo(dishName) {
    if (menu.hasOwnProperty(dishName)) {
        return `Блюдо: ${dishName}\nОписание: ${menu[dishName]}`;
    } else {
        return `Нет информации о блюде "${dishName}".`;
    }
}function ListDishes() {
    let result = "Меню:\n";
    for (let dish in menu) {
        result += `Блюдо: ${dish}\nОписание: ${menu[dish]}\n\n`;
    }
    return result.trim();
}

AddDish("Паста Карбонара", "Паста с беконом, сливочным соусом и пармезаном.");
AddDish("Стейк Рибай", "Сочный стейк из говядины с картофелем фри.");
AddDish("Салат Цезарь", "Салат с курицей, сухариками и соусом Цезарь.");

console.log(ListDishes());
console.log(GetDishInfo("Паста Карбонара"));
console.log(DeleteDish("Салат Цезарь"));
console.log(ListDishes());