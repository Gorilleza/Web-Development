function addDishPrompt() {
    let dishName = prompt("Введите название блюда:");
    if (dishName === null || dishName.trim() === "") {
        alert("Название блюда не может быть пустым.");
        return;
    }
    let description = prompt("Введите описание блюда:");
    if (description === null || description.trim() === "") {
        alert("Описание блюда не может быть пустым.");
        return;
    }
    AddDish(dishName, description);
    alert(`Блюдо "${dishName}" успешно добавлено в меню.`);
}

function deleteDishPrompt() {
    let dishName = prompt("Введите название блюда для удаления:");
    if (dishName === null || dishName.trim() === "") {
        alert("Название блюда не может быть пустым.");
        return;
    }
    let result = DeleteDish(dishName);
    alert(result);
}

function getDishInfoPrompt() {
    let dishName = prompt("Введите название блюда:");
    if (dishName === null || dishName.trim() === "") {
        alert("Название блюда не может быть пустым.");
        return;
    }
    let info = GetDishInfo(dishName);
    console.log(info);
    alert(info);
}

function listDishesPrompt() {
    let dishes = ListDishes();
    console.log(dishes);
    alert(dishes);
}