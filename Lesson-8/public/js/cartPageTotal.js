Vue.component('cart-page-total', {
	template: `
		<div class="cart__total">
			<div>SUB TOTAL<b>\${{$root.$refs.cartPageItems.cartTotal}}</b></div>
			<div>GRAND TOTAL<span>\${{$root.$refs.cartPageItems.cartTotal}}</span></div>
			<div class="hr"></div>
			<div class="cart__total-button">
				PROCEED TO CHECKOUT
			</div>
		</div>
	`
});