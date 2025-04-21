function loadMenuFromJson() {
    fetch('menu.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки файла');
            }
            return response.json();
        })
        .then(data => {
            menu = {};
            for (const [dish, description] of Object.entries(data)) {
                AddDish(dish, description);
            }
            displayMenuAsTable(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось загрузить меню: ' + error.message);
        });
}

function displayMenuAsTable(menuData) {
    const container = document.getElementById('menuTableContainer');
    let html = '<table><tr><th>Название блюда</th><th>Описание</th></tr>';
    
    for (const [dish, description] of Object.entries(menuData)) {
        html += `<tr><td>${dish}</td><td>${description}</td></tr>`;
    }
    
    html += '</table>';
    container.innerHTML = html;
}

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