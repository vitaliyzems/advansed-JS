Vue.component('cart-page-buttons', {
	template: `
		<div class="cart__buttons">
			<div class="button1" @click="$root.$refs.cartPageItems.clearCart()">
					CLEAR SHOPPING CART
			</div>
			<a href="index.html" class="button2">
					CONTINUE SHOPPING
			</a>
		</div>
	`
});