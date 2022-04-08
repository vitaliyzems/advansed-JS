const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
];

const renderProduct =
  (title = 'Товар', price = 'Цена', img = './img/pc.png') => {
    return `<div class="product-item">
            <img class="product-img" src="${img}" alt="pc">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by-btn">Добавить</button>
          </div>`;
  };

const renderProducts = list => {
  const productList = list.map((good) => {
    return renderProduct(good.title, good.price);
  });
  // Запятые отображаются, так как метод map создает новый массив из объектов,
  // а они следуют друг за другом через запятую. Это можно решить использовав
  // метод join к получившемуся массиву. Либо можно удалить ноды запятых из 
  // разметки.
  document.querySelector('.products').innerHTML = productList.join('');

  console.log(productList);
};

renderProducts(products);