Vue.component('search', {
	data() {
		return {
			searchStr: '',
			show: false,
		}
	},
	template: `
		<div>	
			<img src="img/search.svg" 
					 alt="search" 
					 class="searchField__toggle"
					 @click="show = !show">
			<input 
				type="text"
				class="searchField"
				v-show="show"
				v-model="searchStr"
				@input="$root.$refs.products.filter(searchStr)"
				>
		</div>
	`
});