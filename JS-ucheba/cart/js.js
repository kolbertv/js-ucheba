"use strict";

const cart = {

    summItems: 0,
    summPrice: 0,

    /**
     * @property {Object} settings Настройка корзины
     */
    settings: {
        containerItemsClass: '.containerItems',
        summItems: 0,
        summPrice: 0,
    },

    /**
     * Инициализация корзины
     * @param {Object}settings Объект с настройками
     */
    init(settings) {
        this.settings = Object.assign(this.settings, settings);

        document
            .querySelector(this.settings.containerItemsClass)
            .addEventListener('click', event => this.clickHandler(event))
    },

    /**
     * ОБрабатка клика по кнопке
     * @param event Событие клика мышью
     */
    clickHandler(event) {

        if (event.target.tagName !== 'BUTTON') {
            console.log('не по кнопке');
            return;
        }
        return this.summCart(event.target.dataset.price);
    },

    /**
     *  Сложение товаров в корзину
     * @param price Стоимость товара
     */
    summCart(price) {

        this.summItems = parseInt(this.summItems) + 1;
        this.summPrice = parseInt(this.summPrice) + parseInt(price);
        this.addCartInfo(this.summItems, this.summPrice);
    },


    /**
     * вывод информации на страницу
     * @param items кол-во товаров
     * @param price сумарная цена товаров
     */


    addCartInfo(items, price) {

        let summItems = document.getElementById('summGoods');
        summItems.innerText = items;

        let summPrice = document.getElementById('summPrice');
        summPrice.innerText = price;
    }

};

window.onload = () => cart.init();
