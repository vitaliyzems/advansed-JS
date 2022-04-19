const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const getRequest = url => {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject(new Error('Неудача'));
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    });
};

class ProductList {
    constructor(cart, container = '.products') {
        this.container = document.querySelector(container);
        this.cart = cart;
        this._goods = [];
        this._productsObjects = [];

        this.getProducts()
            .then(data => {
                this._goods = data;
                this._render();
                console.log(this.getTotalPrice());
            });
    }

    getProducts() {
        return getRequest(`${API}/catalogData.json`)
            .then(response => JSON.parse(response))
            .catch(err => console.log(err));
    }

    getTotalPrice() {
        return this._productsObjects.reduce((accumulator, good) => accumulator + good.price, 0);
    }

    _render() {
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._productsObjects.push(productObject);
            this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
            productObject.addHandlerForBtn(product);
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.img = img;
    }

    getHTMLString() {
        return `<div class="product-item" data-id="${this.id}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price} \u20bd</p>
                      <button class="buy-btn">Купить</button>
                  </div>
              </div>`;
    }

    addHandlerForBtn(product) {
        const productEl = document.querySelector(`[data-id="${this.id}"]`);
        this.btn = productEl.querySelector('.buy-btn');
        this.btn.addEventListener('click', () => {
            fetch(`${API}/addToBasket.json`)
                .then(response => response.json())
                .then(data => {
                    if (data.result === 1) {
                        this.addToCart(product);
                    }
                });
        });
    }

    addToCart(product) {
        if (cart.cartObj.hasOwnProperty([this.id])) {
            cart.cartObj[this.id].quantity++;
            cart.cartObj[this.id].total += cart.cartObj[this.id].price;
            cart.updateCart();
        } else {
            const cartItem = new CartItem(product);
            cart.cartObj[cartItem.id_product] = cartItem;
            cart.renderCart();
        }
    }
}

class Cart {
    constructor(container = '.cart') {
        this.container = document.querySelector(container);
        this.items = [];
        this.cartObj = {};
        this.getBasket()
            .then(data => {
                data.contents.forEach(product => this.items.push(product));
                this.getCartObj();
                this.renderCart();
            });
        this.addHandler();
    }

    getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(response => response.json());
    }

    getCartObj() {
        this.items.forEach(item => {
            this.cartObj[item.id_product] = item;
            let product = this.cartObj[item.id_product];
            product.total = product.price * product.quantity;
        });
    }

    addHandler() {
        const cartBtnEl = document.querySelector('.btn-cart');
        cartBtnEl.addEventListener('click', () => {
            this.container.classList.toggle('hidden');
        });
    }

    renderCart() {
        for (const id in this.cartObj) {
            const cartItem = this.cartObj[id];
            if (!this.container.querySelector(`.cartItem[data-id="${id}"]`)) {
                this.container.insertAdjacentHTML(
                    'beforeend',
                    this.getHTMLString(
                        cartItem.id_product,
                        cartItem.product_name,
                        cartItem.price,
                        cartItem.quantity,
                        cartItem.total
                    ));
                this.addDeleteHandler(id);
            }
        }
    }

    getHTMLString(id, name, price, quantity, total) {
        return `
            <div class="cartItem" data-id="${id}">
                <img class="cartProductImg" src="https://via.placeholder.com/200x150" alt="Фото">
                <div class="cartProductDesc">
                    <div class="cartProductName">${name}</div>
                    <div class="cartProductPrice">${price}</div>
                    <div class="cartProductQuantity">${quantity}</div>
                    <div class="cartProductTotal">${total}</div>
                </div>
                <button>X</button>
            </div>`;
    }

    addDeleteHandler(id) {
        const productEl = this.container.querySelector(`.cartItem[data-id="${id}"]`);
        const delBtn = productEl.querySelector('button');
        delBtn.addEventListener('click', () => {
            fetch(`${API}/deleteFromBasket.json`)
                .then(response => response.json())
                .then(data => {
                    if (data.result === 1) {
                        if (this.cartObj[id].quantity > 1) {
                            this.cartObj[id].quantity--;
                            this.cartObj[id].total -= this.cartObj[id].price;
                            this.updateCart();
                        } else if (this.cartObj[id].quantity === 1) {
                            this.cartObj[id].quantity--;
                            productEl.remove();
                            delete this.cartObj[id];
                        }
                    }
                });
        });
    }

    updateCart() {
        for (const id in this.cartObj) {
            const quantity = this.cartObj[id].quantity;
            const total = this.cartObj[id].total;
            if (!quantity) {
                return;
            }
            const cartItem = this.container.querySelector(`.cartItem[data-id="${id}"]`);
            cartItem.querySelector('.cartProductQuantity').textContent = quantity;
            cartItem.querySelector('.cartProductTotal').textContent = total;
        }
    }
}

class CartItem {
    constructor(product) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity ?? 1;
        this.total = this.price * this.quantity;
    }
}

const cart = new Cart();
const list = new ProductList(cart);