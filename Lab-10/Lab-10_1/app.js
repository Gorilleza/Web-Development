const app = document.getElementById('app');

async function loadContent(page) {
  try {
    const response = await fetch(`pages/${page}.html`);
    if (!response.ok) throw new Error('Страница не найдена');
    return await response.text();
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return `<h1>Ошибка загрузки страницы</h1><p>${error.message}</p>`;
  }
}

async function render(route) {
  if (route === 'home') {
    const content = await loadContent('home');
    app.innerHTML = content;
  } else if (route === 'menu') {
    const content = await loadContent('menu');
    app.innerHTML = content;
    initMenuCards();
  }
}

function initMenuCards() {
  const addToCartButtons = document.querySelectorAll('.product-button');
  addToCartButtons.forEach(button => {
    const productTitle = button.closest('.product-card').querySelector('.product-title').textContent;
    button.onclick = () => addToCart(productTitle);
  });
  
  const homeButton = document.querySelector('.home-button');
  if (homeButton) {
    homeButton.onclick = () => navigate('home');
  }
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