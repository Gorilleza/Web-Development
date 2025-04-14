const app = document.getElementById('app');

function render(route) {
  if (route === 'home') {
    app.innerHTML = `
      <h1>Добро пожаловать в наше кафе!</h1>
      <p>У нас вкуснейшие блюда, уютная атмосфера и отличный сервис.<br>Вы можете ознакомиться с меню нажав на кнопку снизу.</p>
      <button onclick="navigate('menu')">Посмотреть меню</button>
    `;
  } else if (route === 'menu') {
    app.innerHTML = `
      <h1>Меню кафе</h1>
      <div class="menu-grid">
        ${renderMenuCard('Капучино', '7,5 BYN', '/Users/eziz/Desktop/WEB-программирование/Lab 9/images/capp.jpeg')}
        ${renderMenuCard('Лимонад','5 BYN', '/Users/eziz/Desktop/WEB-программирование/Lab 9/images/62b418f941722.jpg')}
        ${renderMenuCard('Чизкейк', '10 BYN', '/Users/eziz/Desktop/WEB-программирование/Lab 9/images/istockphoto-179640507-612x612.jpg')}
        ${renderMenuCard('Салат Цезарь', '13 BYN', '/Users/eziz/Desktop/WEB-программирование/Lab 9/images/Цезарь.png')}
        ${renderMenuCard('Паста с креветками', '45 BYN', '/Users/eziz/Desktop/WEB-программирование/Lab 9/images/big_416173.jpg')}
      </div>
      <button onclick="navigate('home')">На главную</button>
    `;
  }
}

function renderMenuCard(title, price, imgUrl) {
  return `
    <div class="product-card">
      <img src="${imgUrl}" alt="${title}" class="product-image" />
      <div class="product-info">
        <h3 class="product-title">${title}</h3>
        <div class="product-footer">
          <span class="product-price">${price}</span>
          <button class="product-button" onclick="addToCart('${title}')">В корзину</button>
        </div>
      </div>
    </div>
  `;
}

function addToCart(item) {
  alert(`Вы добавили "${item}" в корзину!`);
}

function navigate(route) {
  history.pushState({ route }, '', `#${route}`);
  render(route);
}

window.onpopstate = (event) => {
  const route = event.state?.route || 'home';
  render(route);
};

const initialRoute = location.hash.replace('#', '') || 'home';
render(initialRoute);
