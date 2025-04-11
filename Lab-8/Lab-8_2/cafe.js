class TLocalStorage {
    constructor(namespace) {
      this.namespace = namespace || 'cafe_menu';
    }
  
    setValue(key, value) {
      const data = this.getAll();
      data[key] = value;
      localStorage.setItem(this.namespace, JSON.stringify(data));
    }
  
    getValue(key) {
      const data = this.getAll();
      return data[key] || null;
    }
  
    removeValue(key) {
      const data = this.getAll();
      delete data[key];
      localStorage.setItem(this.namespace, JSON.stringify(data));
    }
  
    getAll() {
      const data = localStorage.getItem(this.namespace);
      return data ? JSON.parse(data) : {};
    }
  
    clear() {
      localStorage.removeItem(this.namespace);
    }
  }
  
  const menuStorage = new TLocalStorage('cafe_menu');
  
  function initMenu() {
    const savedMenu = menuStorage.getAll();
    if (Object.keys(savedMenu).length === 0) {
      AddDish("Паста Карбонара", "Паста с беконом, сливочным соусом и пармезаном");
      AddDish("Стейк Рибай", "Сочный стейк из говядины с картофелем фри");
      AddDish("Салат Цезарь", "Салат с курицей, сухариками и соусом Цезарь");
    }
  }
  
  function AddDish(dishName, description) {
    const dish = {
      name: dishName,
      description: description,
      createdAt: new Date().toISOString()
    };
    menuStorage.setValue(dishName, dish);
    console.log(`Блюдо "${dishName}" добавлено в меню.`);
  }
  
  function DeleteDish(dishName) {
    const dish = menuStorage.getValue(dishName);
    if (dish) {
      menuStorage.removeValue(dishName);
      return `Блюдо "${dishName}" удалено из меню.`;
    } else {
      return `Блюдо "${dishName}" не найдено в меню.`;
    }
  }
  
  function GetDishInfo(dishName) {
    const dish = menuStorage.getValue(dishName);
    if (dish) {
      return `Блюдо: ${dish.name}\nОписание: ${dish.description}\nДобавлено: ${new Date(dish.createdAt).toLocaleDateString()}`;
    } else {
      return `Нет информации о блюде "${dishName}".`;
    }
  }
  
  function ListDishes() {
    const allDishes = menuStorage.getAll();
    let result = "Текущее меню:\n\n";
    
    for (const dishName in allDishes) {
      const dish = allDishes[dishName];
      result += `• ${dish.name} (${new Date(dish.createdAt).toLocaleDateString()})\n   ${dish.description}\n\n`;
    }
    
    return result.trim() || "Меню пустое.";
  }
  
  function addDishPrompt() {
    const name = prompt("Введите название блюда:");
    if (!name) return;
  
    const description = prompt("Введите описание блюда:");
    if (!description) return;
  
    AddDish(name, description);
    alert(`Блюдо "${name}" успешно добавлено!`);
  }
  
  function deleteDishPrompt() {
    const name = prompt("Введите название блюда для удаления:");
    if (!name) return;
  
    const result = DeleteDish(name);
    alert(result);
  }
  
  function getDishInfoPrompt() {
    const name = prompt("Введите название блюда:");
    if (!name) return;
  
    const info = GetDishInfo(name);
    alert(info);
  }
  
  function listDishesPrompt() {
    const menuList = ListDishes();
    alert(menuList);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    console.log("Меню инициализировано:", menuStorage.getAll());
  });