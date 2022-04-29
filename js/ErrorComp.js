Vue.component('error', {
	data() {
		return {
			show: false,
		};
	},
	template: `
		<div class="error" v-if="show">
			Ошибка,<br>
			данные не получены!
		</div>`
});