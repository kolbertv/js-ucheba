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
                let $basketData = $('<div />', {
                    id: 'basket_data'
                });

                this.coutGoods = data.basket.length;
                this.ammount = data.amount;

                $basketData.append('<p>всего товаров:' + this.countGoods + '</p>');
                $basketData.append('<p>общая сумма:' + this.ammount + '</p>');
                $basketData.appendTo(appendId);

                /**
                 * Добавить товары в массив
                 */

                for (let itemKey in data.basket) {
                    this.basketItems.push(data.basket[itemKey]);
                }

                console.log(this.basketItems);
            }

        });


    };

    /**
     * Отрисовывание корзины на странице
     */

    render(root) {
        let $basketDiv = $('<div />',{
            id: this.id,
            text: 'Корзина'
        });

        let $basketItemDiv = $('<div />', {
            id: this.id + '_items'
        });

        $basketItemDiv.appendTo($basketDiv);
        $basketDiv.appendTo(root);
    };

    /**
     * Добавление в корзину новых товаров
     * @param idProduct
     * @param quantity
     * @param price
     */
    add(idProduct, quantity, price) {
        let basketItems = {
            "id_product": idProduct,
            "price": price
        };

        this.countGoods += quantity;
        this.ammount += price*quantity;
        this.basketItems.push(basketItems);
        this.refresh();
    }

    /**
     * Перерисовка корзины
     */
    refresh() {

        let $basketDataDiv = $('#basket_data');
        $basketDataDiv.empty();
        $basketDataDiv.append('<p>всего товаров:' + this.countGoods + '</p>');
        $basketDataDiv.append('<p>общая сумма:' + this.ammount + '</p>');
    }

    remove(id) {


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
        basket.add(idProduct,quantity,price);
    })

});