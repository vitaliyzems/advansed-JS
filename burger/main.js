class Burger {
	// Размер бургера: 'small' или 'big';
	// Начинка: 'cheese', 'salad' либо 'potato'.
	constructor(size = 'small', stuffing = 'cheese') {
		this.size = size;
		this.stuffing = stuffing;
		this.toppings = [];
	}

	// Добавить посыпку ('spice' или 'mayonnaise').
	addToping(topping) {
		if (this.toppings.includes(topping)) {
			return;
		}
		this.toppings.push(topping);
	}

	// Убрать посыпку ('spice' или 'mayonnaise').
	removeToping(topping) {
		this.toppings.splice(this.toppings.indexOf(topping, 0), 1);
	}

	getToppings() {
		this.toppings.forEach(topping => console.log(topping));
	}

	getSize() {
		console.log('Размер бургера:', this.size);
	}

	getStuffing() {
		console.log('Начинка бургера:', this.stuffing);
	}

	calculatePrice() {
		let price = 0;
		if (this.size === 'big') {
			price += 100;
		} else {
			price += 50;
		}
		if (this.stuffing === 'cheese') {
			price += 10;
		} else if (this.stuffing === 'potato') {
			price += 15;
		} else {
			price += 20;
		}
		if (this.toppings.includes('spice', 0)) {
			price += 15;
		}
		if (this.toppings.includes('mayonnaise', 0)) {
			price += 20;
		}
		console.log('Цена:', price);
	}

	calculateCalories() {
		let calories = 0;
		if (this.size === 'big') {
			calories += 40;
		} else {
			calories += 20;
		}
		if (this.stuffing === 'cheese') {
			calories += 20;
		} else if (this.stuffing === 'potato') {
			calories += 10;
		} else {
			calories += 5;
		}
		if (this.toppings.includes('mayonnaise', 0)) {
			calories += 5;
		}
		console.log('Кол-во калорий:', calories);
	}
}