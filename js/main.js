const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        searchLine: '',
        isVisibleCart: false,
        filtered: [],
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        filterGoods() {
            console.log(this.searchLine);
            this.filterProducts();
            console.log(this.filtered);
        },
        // Запутался как реализовать фильтр.
        filterProducts() {
            const regExp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regExp.test(product.product_name));
        },
        showCart() {
            this.isVisibleCart
                ? this.isVisibleCart = false
                : this.isVisibleCart = true;
        }
    },
    beforeCreate() {
    },
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
    },
    beforeMount() {
    },
    mounted() {
    },
    beforeUpdate() {
    },
    updated() {
    },
    beforeDestroy() {
    },
    destroyed() {
    },
});
