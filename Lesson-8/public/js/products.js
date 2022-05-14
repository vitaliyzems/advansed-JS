Vue.component('products', {
	data() {
		return {
			products: [],
			filtered: [],
		}
	},
	methods: {
		filter(value) {
			let regexp = new RegExp(value, 'i');
			this.filtered = this.products.filter(item => regexp.test(item.name));
		},
		getToProductPage(product) {
			this.$parent.putJson(`/api/products/${product.id}`, { currentProduct: true });
		}
	},
	mounted() {
		this.$parent.getJson('/api/products')
			.then(data => {
				for (let el of data) {
					this.products.push(el);
					this.filtered.push(el);
				}
			});
	},
	template: `
		<div class="catalog__grid">
			<product v-for="item of filtered" :product="item" :key="item.id"></product>
		</div>
	`
});
Vue.component('product', {
	props: ['product'],

	template: `
		<div class="catalog__item">
			<div class="catalog__hover">
				<button @click="$root.$refs.cart.addToCart(product)">Buy</button>
				<a href="product.html" @click="$root.$refs.products.getToProductPage(product)">Открыть страницу товара</a>
			</div>
			<img :src="product.img" alt="">
			<div class="bot">
				<h4>{{product.name}}</h4>
				<p>{{product.desc}}</p>
				<p>{{product.price}}$</p>
			</div>
		</div>
	`
});