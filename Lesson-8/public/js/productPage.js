Vue.component('product-page', {
	data() {
		return {
			products: [],
			current: ''
		}
	},
	mounted() {
		this.$parent.getJson('/api/products')
			.then(data => {
				for (let el of data) {
					this.products.push(el);
					if (el.currentProduct) this.current = el;
				}
			});
	},
	template: `
		<div>
			<div class="product-look">
				<div>
					<img src="img/arrow-left.svg" alt="previous" title="previous image">
				</div>
				<img :src="current.img" alt="">
				<div>
					<img src="img/arrow-right.svg" alt="next" title="next image">
				</div>
			</div>
			<div class="card container">
				<div>
					<div class="card__heading-one">
						NEW COLLECTION
					</div>
					<div class="card__line">
					</div>
					<div class="card__heading-two">
						{{current.name}}
					</div>
					<p class="card__description">
							{{current.desc}}
					</p>
					<p class="card__price">
							\${{current.price}}
					</p>
					<hr>
					<div class="card__button" @click="$root.$refs.cart.addToCart(current)">
						<img src="img/add-to-cart.svg" alt="">
						<p>Add to Cart</p>
					</div>
				</div>
			</div>
		</div>
	`
});