Vue.component('cart', {
	data() {
		return {
			cartItems: [],
			isCartShow: false,
		}
	},
	methods: {
		addToCart(product) {
			let find = this.cartItems.find(el => el.id === product.id);
			if (find) {
				this.$parent.putJson(`/api/cart/${find.id}`, { quantity: 1 });
				find.quantity++;
			} else {
				let newItem = Object.assign({ quantity: 1 }, product);
				this.$parent.postJson('/api/cart', newItem)
					.then(data => {
						if (data.result === 1) {
							this.cartItems.push(newItem);
						}
					});
			}
		},
		removeProduct(product) {
			if (product.quantity > 1) {
				this.$parent.putJson(`api/cart/${product.id}`, { quantity: -1 });
				product.quantity--;
			} else {
				this.$parent.deleteJson(`api/cart/${product.id}`);
				this.cartItems.splice(this.cartItems.indexOf(product), 1);
			}
		},
	},
	computed: {
		cartTotal: function () {
			let summ = 0;
			for (let item of this.cartItems) {
				summ += item.price * item.quantity;
			}
			return summ.toFixed(2);
		},
		cartCount: function () {
			let count = 0;
			for (let item of this.cartItems) {
				count += item.quantity;
			}
			return count;
		}
	},
	mounted() {
		this.$parent.getJson('/api/cart')
			.then(data => {
				for (let el of data) {
					this.cartItems.push(el);
				}
			});
	},
	template: `
		<div>
			<img src="img/cart.svg" alt="cart" class="header__cart showCart" @click="isCartShow = !isCartShow">
			<span class="cart__counter showCart" v-if="cartItems.length" @click="isCartShow = !isCartShow">{{cartCount}}</span>
			<div class="cart__dropdown" v-show="isCartShow">
				<div class="cart__empty" v-if="!cartItems.length">Корзина пуста</div>
				<div class="added__products">
					<cartItem 
						v-for="item of cartItems"
						:product="item"
						:key="item.id"
						></cartItem>
				</div>
				<div class="cart__summary" v-if="cartItems.length">
					<h4>Сумма товаров в корзине:<span>\${{cartTotal}}</span></h4>
					<a href="cart.html">Перейти в корзину</a>
				</div>
			</div>
		</div>
	`
});
Vue.component('cartItem', {
	props: ['product'],
	template: `
		<div class="added__product">
			<img :src="product.img" alt="IMG">
			<div class="added__description">
				<h3>{{product.name}}</h3>
				<div>
					<p>Цена за штуку<span>{{product.price}}$</span></p>
					<p>Кол-во<span>{{product.quantity}}</span></p>
					<p>Сумма<span>{{(product.price * product.quantity).toFixed(2)}}$</span></p>
					<p @click="$root.$refs.cart.removeProduct(product)">&times;</p>
				</div>
			</div>
		</div>
	`
});