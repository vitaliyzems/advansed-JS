class Cart {
  constructor() {

  }

  addToCart() {

  }

  renderCart() {

  }

  cleanCart() {

  }
}

class CartItem {
  constructor() {

  }

  renderCartItem() {

  }
}

class ProductList {
  constructor(container = '.products') {
    this.container = document.querySelector(container);
    this.goods = [];
    this.productsObjects = [];

    this.fetchGoods();
    this.render();
    this.calcTotalPrice();
  }

  fetchGoods() {
    this.goods = [
      { id: 1, title: 'Notebook', price: 20000 },
      { id: 2, title: 'Mouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 },
    ];
  }

  render() {
    for (const product of this.goods) {
      const productObject = new ProductItem(product);

      this.productsObjects.push(productObject);
      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }

  calcTotalPrice() {
    let totalPrice = 0;
    this.productsObjects.forEach(product => totalPrice += product.price);
    console.log('Сумма товаров равна:', totalPrice);
  }
}

class ProductItem {
  constructor(product, img = './img/pc.png') {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item">
              <img class="product-img" src="${this.img}" alt="pc">
              <h3>${this.title}</h3>
              <p>${this.price}</p>
              <button class="by-btn">Добавить</button>
            </div>`
  }
}

const list = new ProductList();