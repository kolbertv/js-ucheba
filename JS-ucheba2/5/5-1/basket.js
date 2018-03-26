class Basket {
    constructor(idBasket) {
        this.id = idBasket;
        this.basketItems = [];
        this.countGoods = 0;
        this.ammount = 0;
        this.collectBasketItems();
    };

    /**
     * метод получения из json файла
     */

    collectBasketItems() {
        let appendId = '#' + this.id + '_items';
        // let self = this;

        $.get({
            url: './basket.json',
            dataType: 'json',
            context: this,
            success: function (data) {
                let $basketData = $('#basket_data');
                this.coutGoods = data.basket.length;
                this.ammount = data.amount;
                $basketData.append('<div><p>всего:</p></div>' + '<div><p>' + this.ammount + ' руб. </p></div>');
            }
        });

    };

    /**
     * Отрисовывание корзины на странице
     */

    render(root) {

        let $basketItemDiv = $('<div />', {
            id: this.id + '_items'
        });

        let $basketItemDivData = $('<div />', {
            id: this.id + '_data',
            class: 'basket_total'
        });

        $basketItemDiv.appendTo(root);
        $basketItemDivData.appendTo(root);
    };

    /**
     * Добавление в корзину новых товаров
     * @param idProduct
     * @param quantity
     * @param price
     */
    add(idProduct, quantity, price, title) {
        let basketItems = {
            "id_product": idProduct,
            "price": price,
            "title": title
        };

        this.countGoods += quantity;
        this.ammount += price * quantity;
        this.basketItems.push(basketItems);
        console.log(this.basketItems);
        this.refresh();
    }

    /**
     * Перерисовка корзины
     */
    refresh() {

        let $basketDataDiv = $('#basket_items');
        $basketDataDiv.empty();

        let $basketData = $('#basket_data');
        $basketData.empty();

        for (let itemKey = 0; itemKey < this.basketItems.length; itemKey++) {

            if ($('div').is('#' + this.basketItems[itemKey].id_product)) {

                let findId = $('#' + this.basketItems[itemKey].id_product).find('#items_ammount');
                let a = findId.text();
                findId.text(parseInt(a) + 1);

            } else {

                let $itemGoodDiv = $('<div />', {
                    id: this.basketItems[itemKey].id_product,
                    class: 'item_good_div'
                });

                $itemGoodDiv.append('<div><img src="layer-43.png" alt="картинка"></div>');
                $itemGoodDiv.append('<div><p>' + this.basketItems[itemKey].title + '</p>' +
                    '<span id="items_ammount">' + '1' + '</span>' + '<span> x </span>' + this.basketItems[itemKey].price + ' руб.</p></div>');
                $itemGoodDiv.append('<div><img id="but_del" src="del.png" alt="картинка"></div>');
                $basketDataDiv.append($itemGoodDiv);
                $itemGoodDiv.find('#but_del').attr('data-id', this.basketItems[itemKey].id_product);

            }
        }

        $basketData.append('<div><p>всего:</p></div>' + '<div><p>' + this.ammount + ' </p></div>');
    }

    remove(id) {

        for (let itemKey = parseInt(this.basketItems.length) - 1; itemKey => 0; itemKey = itemKey - 1) {

            if (parseInt(this.basketItems[itemKey].id_product) === parseInt(id)) {
                this.ammount = this.ammount - this.basketItems[itemKey].price;
                this.basketItems.splice(itemKey, 1);
                this.refresh();
                return;
            }

        }

    }

}

$(document).ready(function () {


    let goods = document.getElementById('goods');
    let good1 = new Good(123, 'клавиутура', 500);
    good1.render(goods);
    let good2 = new Good(124, 'мышь', 100);
    good2.render(goods);

    /**
     * Создаем корзину
     */

    let basket = new Basket('basket');
    basket.render($('#basket_wraper'));

    $('.buygood').on('click', function () {
        let idProduct = parseInt($(this).attr('data-id'));
        let quantity = 1;
        let price = parseInt($(this).parent().find('.product-price').text());
        let title = $(this).parent().find('.title').text();
        basket.add(idProduct, quantity, price, title);
    });

    $('body').on('click', '#but_del', function () {
        basket.remove($(this).attr('data-id'));
    });

});