"use strict";

class Good {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

     render(goodsContainerSelector) {

        let goodContainer = document.createElement('div');
        goodContainer.className = 'good';

        let goodTitle = document.createElement('p');
        goodTitle.textContent = this.title;

        let goodPrice = document.createElement('p');
        goodPrice.innerHTML = 'Цена: <span class="product-price">' + this.price + '</span>руб.</p>';

         let goodBtn = document.createElement('button');
        goodBtn.className = 'buygood';
        goodBtn.textContent = 'купить';
        goodBtn.dataset.id = this.id;

        /**
         * Создаем структуру в дом
         */
        goodContainer.appendChild(goodTitle);
        goodContainer.appendChild(goodPrice);
        goodContainer.appendChild(goodBtn);

         goodsContainerSelector.appendChild(goodContainer)

    }
}

