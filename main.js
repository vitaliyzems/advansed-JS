'use strict';

const text = document.querySelector('.origin').textContent;
const resultBlock = document.querySelector('.result');

// Заменяем ' на ", но только в начале и в конце предложения.
const result = text.replace(/\B'/gm, '"');

// Добавляем перенос строки.
resultBlock.innerHTML = result.replace(/"\B/gm, '"<br>');

// -----------------------------------------------------------------------------

const formEl = document.querySelector('form');
const errorEl = formEl.querySelector('.error');
const regExp = {
	name: /[a-z]+|[а-я]+/i,
	tel: /\+7\(\d{3}\)\d{3}-\d{4}/,
	email: /^[a-z]+[\.|-]?[a-z]+@[a-z]+\.[a-z]{2,6}$/i,
	someText: /[a-z|\d]+/ig,
};

formEl.addEventListener('submit', e => {
	for (const el of e.target) {
		if (el.classList.contains('submit')) {
			continue;
		}
		const classWord = el.classList[0];
		if (!formValidation(el, regExp[classWord])) {
			el.classList.add('invalid');
			errorEl.classList.remove('hidden');
			e.preventDefault();
		} else {
			el.classList.remove('invalid');
			errorEl.classList.add('hidden');
		}
	}
	if (!e.defaultPrevented) {
		formEl.submit();
	}
});

/**
 * Функция проверяет валидность поля формы.
 * @param {object} el - поле ввода формы
 * @param {object} regExp - регулярное выражение
 * @returns {boolean}
 */
function formValidation(el, regExp) {
	if (!el.value) {
		return;
	}
	return el.value.replace(/\s/g, '') === el.value.match(regExp)?.join('');
}