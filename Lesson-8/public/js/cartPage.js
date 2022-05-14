Vue.component('items', {
	data() {
		return {
			cartItems: [],
		}
	},
	methods: {
		removeProduct(product) {
			if (product.quantity > 1) {
				this.$parent.putJson(`api/cart/${product.id}`, { quantity: -1 });
				product.quantity--;
			} else {
				this.$parent.deleteJson(`api/cart/${product.id}`);
				this.cartItems.splice(this.cartItems.indexOf(product), 1);
			}
		},
		addToCart(product) {
			let find = this.cartItems.find(el => el.id === product.id);
			this.$parent.putJson(`/api/cart/${find.id}`, { quantity: 1 });
			find.quantity++;
		},
		deleteProduct(product) {
			this.$parent.deleteJson(`api/cart/${product.id}`);
			this.cartItems.splice(this.cartItems.indexOf(product), 1);
		},
		clearCart() {
			this.$parent.deleteJson('/api/clear');
			this.cartItems = [];
		},
		getToProductPage(product) {
			this.$parent.putJson(`/api/products/${product.id}`, { currentProduct: true });
		}
	},
	computed: {
		cartTotal: function () {
			let summ = 0;
			for (let item of this.cartItems) {
				summ += item.price * item.quantity;
			}
			return summ.toFixed(2);
		},
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
			<item v-for="item of cartItems" :key="item.id" :product="item"></item>
		</div>
	`
});
Vue.component('item', {
	props: ['product'],
	template: `
		<div class="cart__item">
			<div>
					<a href="product.html">
						<img :src="product.img" alt="" class="item__mainImg" @click="$root.$refs.cartPageItems.getToProductPage(product)">
					</a>
					<div>
							<h3>{{product.name}}</h3>
							<p class="cart__price">Price: <span>\${{product.price}}</span></p>
							<p class="cart__color">Color: Red</p>
							<p class="cart__size">Size: Xl</p>
							<p class="cart__quanity">
								Quanity:
								<span @click="$root.$refs.cartPageItems.removeProduct(product)">-</span>
								<i>{{product.quantity}}</i>
								<span @click="$root.$refs.cartPageItems.addToCart(product)">+</span>
							</p>
					</div>
			</div>
			<img src="img/cart/x.svg" alt="" class="exitImg" @click="$root.$refs.cartPageItems.deleteProduct(product)">
		</div>
	`
});