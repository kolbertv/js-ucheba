"use strict";

/*
 * Сборка фалов JS сторонних
 * //= ../../bower_components/jquery/dist/jquery.js
 */

window.onload = function () {

    var localCartStorageName = 'miniCart';
    var localCatalogStorageName = 'catalogData';

    // localStorage.clear();

    // getJson('getBasket.json', data => miniCart.init(data,localCartStorageName));

    miniCart.init();

    getJson('catalogData.json', function (data) {
        return loadCatalogData.init({
            data: data,
            localCatalogStorageName: localCatalogStorageName,
            localCartStorageName: localCartStorageName
        });
    });
};

/*
 * Подлючение своих файлов JS для сборки
 * //= parts/app.js
 * //= parts/header.js
 * //= parts/footer.js
 */

"use strict";

function localShopStorage(name) {

    // localStorage.clear();
    localStorage[name] = '';

    if (localStorage.getItem(name) !== null) {
        // console.log(`хранилище ${name} существует`);
        return 1;
    } else {
        console.log('\u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A, \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 ' + name + ' \u043D\u0435\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442');
        return 0;
    }
}
/**
 * Функция чтения JSON файлов
 * @param jsonFile
 * @param callback Функция в которую возвращаем результат PARSE и название
 * класса обертки товара
 */

function getJson(jsonFile, callback) {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/' + jsonFile, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log('статус готово');
            // callback(JSON.parse(xhr.responseText), wrapperClass);
            callback(xhr.responseText);
        } else {
            // console.log('статус готовности ' + xhr.readyState);
            // console.log('статус ' + xhr.status);
        }
    };
    xhr.send();
}
var wrapperClass = 'dropdownCart';
var localCartStorageName = 'miniCart';

var miniCart = {

    // init(data, localCartStorageName) {
    //     localStorage[localCartStorageName] = data;
    //     this.render();
    // },

    empyCart: {
        amoun: 0,
        countGoods: 0,
        contents: []
    },

    init: function init() {
        var _this = this;

        if (localStorage.getItem(localCartStorageName) === null) {

            localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
            document.getElementsByClassName(wrapperClass)[0].addEventListener('click', function (click) {
                return _this.clickHandler(event);
            });
            miniCart.render();
        } else {

            document.getElementsByClassName(wrapperClass)[0].addEventListener('click', function (click) {
                return _this.clickHandler(event);
            });
            miniCart.render();
        }
    },
    clickHandler: function clickHandler(event) {

        console.log(event);

        // if (event.target.dataset.button_name === 'clear') {
        //     localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
        //     miniCart.render();
        // }

        switch (event.target.dataset.button_name) {

            case 'clear':

                localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
                break;

            case 'delete':

                this.delete(event);
                break;

        }

        miniCart.render();
    },
    delete: function _delete(event) {

        var id = event.target.dataset.id_product;
        var arr = JSON.parse(localStorage.getItem(localCartStorageName));
        for (var index = 0; index < arr.contents.length; index++) {
            if (parseInt(arr.contents[index].id_product) === parseInt(id)) {

                if (parseInt(arr.contents[index].quantity) > 1) {
                    arr.contents[index].quantity = arr.contents[index].quantity - 1;
                } else {

                    arr.contents.splice(index, 1);
                }
            }
        }

        localStorage.setItem(localCartStorageName, JSON.stringify(arr));
    },
    render: function render() {

        var ammount = 0;
        var price = 0;
        var templateItemContainer = '';

        var arr = JSON.parse(localStorage.getItem("miniCart")).contents;

        var tempDropDownCart = document.getElementsByClassName('dropdownCart')[0];
        tempDropDownCart.innerHTML = '';

        if (arr.length !== 0) {

            var tempDropDownCartItemWraper = document.createElement('div');
            tempDropDownCartItemWraper.className = 'dropdownCart__itemWraper';

            var dropdownCart__buttonWrapper = document.createElement('div');
            dropdownCart__buttonWrapper.className = 'dropdownCart__buttonWrapper';

            tempDropDownCart.appendChild(tempDropDownCartItemWraper);
            tempDropDownCart.appendChild(dropdownCart__buttonWrapper);

            for (var i = 0; i < arr.length; i++) {

                var tempDropDownCartItem = document.createElement('div');
                tempDropDownCartItem.className = 'dropdownCart__item';
                tempDropDownCartItem.innerHTML = '<img class="dropdownCart__img" src="img/' + arr[i].img + '" alt="">';

                var tempDropDownInfoWraper = document.createElement('div');
                tempDropDownInfoWraper.className = 'dropdownCart__infoWrapper';
                var pPrice = document.createElement('p');
                pPrice.className = 'dropdownCart__price';
                pPrice.innerHTML = arr[i].quantity + ' x ' + arr[i].price + ' \u0440\u0443\u0431.';
                tempDropDownInfoWraper.appendChild(pPrice);
                var pDescr = document.createElement('p');
                pDescr.className = 'dropdownCart__description';
                pDescr.innerHTML = '' + arr[i].product_name;
                tempDropDownInfoWraper.appendChild(pDescr);

                tempDropDownCartItem.appendChild(tempDropDownInfoWraper);
                tempDropDownCartItemWraper.appendChild(tempDropDownCartItem);

                var tempButton = document.createElement('div');
                tempButton.innerHTML = '<button class="button dropdownCart__buttonDel" data-button_name="delete" data-id_product="' + arr[i].id_product + '">x</button>';
                tempDropDownCartItem.appendChild(tempButton);

                price = price + arr[i].quantity * arr[i].price;
                ammount = ammount + arr[i].quantity;
            }

            var button = '\n                    <button class="button dropdownCart__button dropdownCart__button_mod" data-button_name="check">\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C</button>\n                    <button class="button dropdownCart__button dropdownCart__button_mod" data-button_name="cart"><a href="../bigcart.html">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</a></button>\n                    <button class="button dropdownCart__button dropdownCart__button_mod" data-button_name="clear">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</button>\n                    ';

            dropdownCart__buttonWrapper.innerHTML = button;
        } else {

            // console.log('miniCart.render выводит пустую форму без товаров');
            var templateItem = '\n                  <div class="dropdownCart__empty">\n                      <p class="dropdownCart__imgCart"><i class="fa fa-shopping-cart"></i></p>\n                      <p>\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442</p>\n                   </div>\n            ';

            tempDropDownCart.innerHTML = templateItem;
        }

        var buttonCart = document.getElementsByClassName('headerMiddle__myCart_mod')[0];
        var buttonCartTemplate = '<span class="textPink">' + ammount + '&nbsp\n                </span>\u0442\u043E\u0432\u0430\u0440\u043E\u0432/&nbsp<span class="textPink">' + price + '&nbsp</span>\u0440\u0443\u0431';
        buttonCart.innerHTML = buttonCartTemplate;
    }
};
var loadCatalogData = {

    settings: {
        data: '',
        localCatalogStorageName: 'catalogData',
        localCartStorageName: 'getBasket'
    },

    init: function init(settings) {
        var _this2 = this;

        this.settings = Object.assign((this.settings, settings));
        localStorage.setItem(this.settings.localCatalogStorageName, this.settings.data);
        var dataParse = JSON.parse(localStorage[this.settings.localCatalogStorageName]);
        this.render(this.settings.localCatalogStorageName);
        document.getElementsByClassName('gallery__itemWrapper')[0].addEventListener('click', function (event) {
            return _this2.clickHandler(event);
        });
    },


    /**
     * Обработка клика по кнопке
     * @param event
     */
    clickHandler: function clickHandler(event) {

        if (event.target.tagName !== 'BUTTON') {
            console.log('not a button');
            return;
        }
        return this.addCart(event.target.dataset.id_product);
    },
    addCart: function addCart(id_product) {

        var checkContain = false;
        var dataCart = JSON.parse(localStorage.getItem(this.settings.localCartStorageName));
        if (dataCart.contents.length !== null) {
            for (var index = 0; index < dataCart.contents.length; index++) {
                if (parseInt(id_product) == parseInt(dataCart.contents[index].id_product)) {
                    dataCart.contents[index].quantity = dataCart.contents[index].quantity + 1;
                    localStorage.setItem(this.settings.localCartStorageName, JSON.stringify(dataCart));
                    miniCart.render();
                    checkContain = true;
                }
            }
        } else {
            checkContain = true;
        }

        if (!checkContain) {

            var dataItemFromCatalog = JSON.parse(localStorage.getItem(this.settings.localCatalogStorageName))[parseInt(id_product - 1)];
            var arrLegth = dataCart.contents.length;
            var arrItem = {};
            arrItem.id_product = parseInt(id_product);
            arrItem.img = dataItemFromCatalog.img;
            arrItem.product_name = dataItemFromCatalog.product_name;
            arrItem.price = dataItemFromCatalog.price;
            arrItem.quantity = parseInt(1);
            dataCart.contents.push(arrItem);
            localStorage.setItem(this.settings.localCartStorageName, JSON.stringify(dataCart));
            miniCart.render();
        }
    },
    render: function render(localCatalogStorageName) {
        var dataParse = JSON.parse(localStorage[localCatalogStorageName]);
        var gallaryWrapper = document.getElementsByClassName('gallery__itemWrapper')[0];
        var gallaryItemContainer = '';
        for (var index = dataParse.length - 1; index > dataParse.length - 6; index--) {

            var galleryTemplate = '\n            <div class="gallery__item">\n             <div class="gallery__containerItemImg"><img class="gallery__itemImg" src="img/' + dataParse[index].img + '"alt=""></div>\n                    <div><p class="gallery__itemTitle">' + dataParse[index].product_name + '</p></div>\n                    <div><p class="gallery__atings">*****</p></div>\n                    <div><p class="gallery__price">' + dataParse[index].price + ' ' + dataParse[index].currency + '</p></div>\n                    <div>\n                        <button class="button gallery__itemButton" data-id_product="' + dataParse[index].id_product + '">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n                    </div>\n            </div>';
            gallaryItemContainer = gallaryItemContainer + galleryTemplate;
        }
        gallaryWrapper.innerHTML = gallaryItemContainer;
    }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwibG9jYWxDYXJ0U3RvcmFnZU5hbWUiLCJsb2NhbENhdGFsb2dTdG9yYWdlTmFtZSIsIm1pbmlDYXJ0IiwiaW5pdCIsImdldEpzb24iLCJsb2FkQ2F0YWxvZ0RhdGEiLCJkYXRhIiwibG9jYWxTaG9wU3RvcmFnZSIsIm5hbWUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsImpzb25GaWxlIiwiY2FsbGJhY2siLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic2VuZCIsIndyYXBwZXJDbGFzcyIsImVtcHlDYXJ0IiwiYW1vdW4iLCJjb3VudEdvb2RzIiwiY29udGVudHMiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGlja0hhbmRsZXIiLCJldmVudCIsInJlbmRlciIsInRhcmdldCIsImRhdGFzZXQiLCJidXR0b25fbmFtZSIsImRlbGV0ZSIsImlkIiwiaWRfcHJvZHVjdCIsImFyciIsInBhcnNlIiwiaW5kZXgiLCJsZW5ndGgiLCJwYXJzZUludCIsInF1YW50aXR5Iiwic3BsaWNlIiwiYW1tb3VudCIsInByaWNlIiwidGVtcGxhdGVJdGVtQ29udGFpbmVyIiwidGVtcERyb3BEb3duQ2FydCIsImlubmVySFRNTCIsInRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlciIsImFwcGVuZENoaWxkIiwiaSIsInRlbXBEcm9wRG93bkNhcnRJdGVtIiwiaW1nIiwidGVtcERyb3BEb3duSW5mb1dyYXBlciIsInBQcmljZSIsInBEZXNjciIsInByb2R1Y3RfbmFtZSIsInRlbXBCdXR0b24iLCJidXR0b24iLCJ0ZW1wbGF0ZUl0ZW0iLCJidXR0b25DYXJ0IiwiYnV0dG9uQ2FydFRlbXBsYXRlIiwic2V0dGluZ3MiLCJPYmplY3QiLCJhc3NpZ24iLCJkYXRhUGFyc2UiLCJ0YWdOYW1lIiwiYWRkQ2FydCIsImNoZWNrQ29udGFpbiIsImRhdGFDYXJ0IiwiZGF0YUl0ZW1Gcm9tQ2F0YWxvZyIsImFyckxlZ3RoIiwiYXJySXRlbSIsInB1c2giLCJnYWxsYXJ5V3JhcHBlciIsImdhbGxhcnlJdGVtQ29udGFpbmVyIiwiZ2FsbGVyeVRlbXBsYXRlIiwiY3VycmVuY3kiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7OztBQU1BQSxPQUFPQyxNQUFQLEdBQWdCLFlBQVk7O0FBRXhCLFFBQUlDLHVCQUF1QixVQUEzQjtBQUNBLFFBQUlDLDBCQUEwQixhQUE5Qjs7QUFFQTs7QUFFQTs7QUFFQUMsYUFBU0MsSUFBVDs7QUFHQUMsWUFBUSxrQkFBUixFQUE0QjtBQUFBLGVBQVFDLGdCQUFnQkYsSUFBaEIsQ0FBcUI7QUFDckRHLHNCQURxRDtBQUVyREwsNERBRnFEO0FBR3JERDtBQUhxRCxTQUFyQixDQUFSO0FBQUEsS0FBNUI7QUFPSCxDQW5CRDs7QUFzQkE7Ozs7Ozs7QUFPQTs7QUFFQSxTQUFTTyxnQkFBVCxDQUEwQkMsSUFBMUIsRUFBZ0M7O0FBRTVCO0FBQ0FDLGlCQUFhRCxJQUFiLElBQXFCLEVBQXJCOztBQUVBLFFBQUlDLGFBQWFDLE9BQWIsQ0FBcUJGLElBQXJCLE1BQStCLElBQW5DLEVBQXlDO0FBQ3JDO0FBQ0EsZUFBTyxDQUFQO0FBQ0gsS0FIRCxNQUdPO0FBQ0hHLGdCQUFRQyxHQUFSLDZKQUE4Q0osSUFBOUM7QUFDQSxlQUFPLENBQVA7QUFDSDtBQUVKO0FBQ0Q7Ozs7Ozs7QUFPQSxTQUFTSixPQUFULENBQWlCUyxRQUFqQixFQUEyQkMsUUFBM0IsRUFBcUM7O0FBRWpDLFFBQUlDLE1BQU0sSUFBSUMsY0FBSixFQUFWO0FBQ0FELFFBQUlFLElBQUos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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKlxyXG4gKiDQodCx0L7RgNC60LAg0YTQsNC70L7QsiBKUyDRgdGC0L7RgNC+0L3QvdC40YVcclxuICogLy89IC4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvanF1ZXJ5L2Rpc3QvanF1ZXJ5LmpzXHJcbiAqL1xyXG5cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgbGV0IGxvY2FsQ2FydFN0b3JhZ2VOYW1lID0gJ21pbmlDYXJ0JztcclxuICAgIGxldCBsb2NhbENhdGFsb2dTdG9yYWdlTmFtZSA9ICdjYXRhbG9nRGF0YSc7XHJcblxyXG4gICAgLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcblxyXG4gICAgLy8gZ2V0SnNvbignZ2V0QmFza2V0Lmpzb24nLCBkYXRhID0+IG1pbmlDYXJ0LmluaXQoZGF0YSxsb2NhbENhcnRTdG9yYWdlTmFtZSkpO1xyXG5cclxuICAgIG1pbmlDYXJ0LmluaXQoKTtcclxuXHJcblxyXG4gICAgZ2V0SnNvbignY2F0YWxvZ0RhdGEuanNvbicsIGRhdGEgPT4gbG9hZENhdGFsb2dEYXRhLmluaXQoe1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUsXHJcbiAgICAgICAgbG9jYWxDYXJ0U3RvcmFnZU5hbWVcclxuICAgIH0pKTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqINCf0L7QtNC70Y7Rh9C10L3QuNC1INGB0LLQvtC40YUg0YTQsNC50LvQvtCyIEpTINC00LvRjyDRgdCx0L7RgNC60LhcclxuICogLy89IHBhcnRzL2FwcC5qc1xyXG4gKiAvLz0gcGFydHMvaGVhZGVyLmpzXHJcbiAqIC8vPSBwYXJ0cy9mb290ZXIuanNcclxuICovXHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbmZ1bmN0aW9uIGxvY2FsU2hvcFN0b3JhZ2UobmFtZSkge1xyXG5cclxuICAgIC8vIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgbG9jYWxTdG9yYWdlW25hbWVdID0gJyc7XHJcblxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYNGF0YDQsNC90LjQu9C40YnQtSAke25hbWV9INGB0YPRidC10YHRgtCy0YPQtdGCYCk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGDRh9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LCDRhdGA0LDQvdC40LvQuNGJ0LUgJHtuYW1lfSDQvdC10YHRg9GJ0LXRgdGC0LLRg9C10YJgKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbn1cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINGH0YLQtdC90LjRjyBKU09OINGE0LDQudC70L7QslxyXG4gKiBAcGFyYW0ganNvbkZpbGVcclxuICogQHBhcmFtIGNhbGxiYWNrINCk0YPQvdC60YbQuNGPINCyINC60L7RgtC+0YDRg9GOINCy0L7Qt9Cy0YDQsNGJ0LDQtdC8INGA0LXQt9GD0LvRjNGC0LDRgiBQQVJTRSDQuCDQvdCw0LfQstCw0L3QuNC1XHJcbiAqINC60LvQsNGB0YHQsCDQvtCx0LXRgNGC0LrQuCDRgtC+0LLQsNGA0LBcclxuICovXHJcblxyXG5mdW5jdGlvbiBnZXRKc29uKGpzb25GaWxlLCBjYWxsYmFjaykge1xyXG5cclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdHRVQnLCAnanNvbi8nICsganNvbkZpbGUsIHRydWUpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfRgdGC0LDRgtGD0YEg0LPQvtGC0L7QstC+Jyk7XHJcbiAgICAgICAgICAgIC8vIGNhbGxiYWNrKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCksIHdyYXBwZXJDbGFzcyk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCh4aHIucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ9GB0YLQsNGC0YPRgSDQs9C+0YLQvtCy0L3QvtGB0YLQuCAnICsgeGhyLnJlYWR5U3RhdGUpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn0YHRgtCw0YLRg9GBICcgKyB4aHIuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoKTtcclxufVxyXG5sZXQgd3JhcHBlckNsYXNzID0gJ2Ryb3Bkb3duQ2FydCc7XHJcbmxldCBsb2NhbENhcnRTdG9yYWdlTmFtZSA9ICdtaW5pQ2FydCc7XHJcblxyXG5sZXQgbWluaUNhcnQgPSB7XHJcblxyXG4gICAgLy8gaW5pdChkYXRhLCBsb2NhbENhcnRTdG9yYWdlTmFtZSkge1xyXG4gICAgLy8gICAgIGxvY2FsU3RvcmFnZVtsb2NhbENhcnRTdG9yYWdlTmFtZV0gPSBkYXRhO1xyXG4gICAgLy8gICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIGVtcHlDYXJ0OiB7XHJcbiAgICAgICAgYW1vdW46IDAsXHJcbiAgICAgICAgY291bnRHb29kczogMCxcclxuICAgICAgICBjb250ZW50czogW11cclxuICAgIH0sXHJcblxyXG4gICAgaW5pdCgpIHtcclxuXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsQ2FydFN0b3JhZ2VOYW1lKSA9PT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KG1pbmlDYXJ0LmVtcHlDYXJ0KSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUod3JhcHBlckNsYXNzKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrID0+IHRoaXMuY2xpY2tIYW5kbGVyKGV2ZW50KSk7XHJcbiAgICAgICAgICAgIG1pbmlDYXJ0LnJlbmRlcigpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh3cmFwcGVyQ2xhc3MpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2sgPT4gdGhpcy5jbGlja0hhbmRsZXIoZXZlbnQpKTtcclxuICAgICAgICAgICAgbWluaUNhcnQucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGNsaWNrSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XHJcblxyXG4gICAgICAgIC8vIGlmIChldmVudC50YXJnZXQuZGF0YXNldC5idXR0b25fbmFtZSA9PT0gJ2NsZWFyJykge1xyXG4gICAgICAgIC8vICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkobWluaUNhcnQuZW1weUNhcnQpKTtcclxuICAgICAgICAvLyAgICAgbWluaUNhcnQucmVuZGVyKCk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRhcmdldC5kYXRhc2V0LmJ1dHRvbl9uYW1lKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdjbGVhcic6XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KG1pbmlDYXJ0LmVtcHlDYXJ0KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGUoZXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWluaUNhcnQucmVuZGVyKCk7XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgZGVsZXRlKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGxldCBpZCA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LmlkX3Byb2R1Y3Q7XHJcbiAgICAgICAgbGV0IGFyciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxDYXJ0U3RvcmFnZU5hbWUpKTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleD0wOyBpbmRleCA8IGFyci5jb250ZW50cy5sZW5ndGg7aW5kZXgrKyl7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludChhcnIuY29udGVudHNbaW5kZXhdLmlkX3Byb2R1Y3QpID09PSBwYXJzZUludChpZCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoYXJyLmNvbnRlbnRzW2luZGV4XS5xdWFudGl0eSk+MSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLmNvbnRlbnRzW2luZGV4XS5xdWFudGl0eSA9IGFyci5jb250ZW50c1tpbmRleF0ucXVhbnRpdHkgLSAxO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLmNvbnRlbnRzLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGFycikpO1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG5cclxuICAgICAgICBsZXQgYW1tb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IHByaWNlID0gMDtcclxuICAgICAgICBsZXQgdGVtcGxhdGVJdGVtQ29udGFpbmVyID0gJyc7XHJcblxyXG4gICAgICAgIGxldCBhcnIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibWluaUNhcnRcIikpLmNvbnRlbnRzO1xyXG5cclxuICAgICAgICBsZXQgdGVtcERyb3BEb3duQ2FydCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Ryb3Bkb3duQ2FydCcpWzBdO1xyXG4gICAgICAgIHRlbXBEcm9wRG93bkNhcnQuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cclxuXHJcbiAgICAgICAgaWYgKGFyci5sZW5ndGggIT09IDApIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB0ZW1wRHJvcERvd25DYXJ0SXRlbVdyYXBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0SXRlbVdyYXBlci5jbGFzc05hbWUgPSAnZHJvcGRvd25DYXJ0X19pdGVtV3JhcGVyJztcclxuXHJcbiAgICAgICAgICAgIGxldCBkcm9wZG93bkNhcnRfX2J1dHRvbldyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZHJvcGRvd25DYXJ0X19idXR0b25XcmFwcGVyLmNsYXNzTmFtZSA9ICdkcm9wZG93bkNhcnRfX2J1dHRvbldyYXBwZXInO1xyXG5cclxuICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydC5hcHBlbmRDaGlsZCh0ZW1wRHJvcERvd25DYXJ0SXRlbVdyYXBlcik7XHJcbiAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnQuYXBwZW5kQ2hpbGQoZHJvcGRvd25DYXJ0X19idXR0b25XcmFwcGVyKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBEcm9wRG93bkNhcnRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0SXRlbS5jbGFzc05hbWUgPSdkcm9wZG93bkNhcnRfX2l0ZW0nO1xyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydEl0ZW0uaW5uZXJIVE1MID0gYDxpbWcgY2xhc3M9XCJkcm9wZG93bkNhcnRfX2ltZ1wiIHNyYz1cImltZy8ke2FycltpXS5pbWd9XCIgYWx0PVwiXCI+YDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcERyb3BEb3duSW5mb1dyYXBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duSW5mb1dyYXBlci5jbGFzc05hbWUgPSdkcm9wZG93bkNhcnRfX2luZm9XcmFwcGVyJztcclxuICAgICAgICAgICAgICAgIGxldCBwUHJpY2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICBwUHJpY2UuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duQ2FydF9fcHJpY2UnO1xyXG4gICAgICAgICAgICAgICAgcFByaWNlLmlubmVySFRNTCA9IGAke2FycltpXS5xdWFudGl0eX0geCAke2FycltpXS5wcmljZX0g0YDRg9CxLmA7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25JbmZvV3JhcGVyLmFwcGVuZENoaWxkKHBQcmljZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgcERlc2NyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICAgICAgcERlc2NyLmNsYXNzTmFtZSA9ICdkcm9wZG93bkNhcnRfX2Rlc2NyaXB0aW9uJztcclxuICAgICAgICAgICAgICAgIHBEZXNjci5pbm5lckhUTUwgPSBgJHthcnJbaV0ucHJvZHVjdF9uYW1lfWA7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25JbmZvV3JhcGVyLmFwcGVuZENoaWxkKHBEZXNjcik7XHJcblxyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydEl0ZW0uYXBwZW5kQ2hpbGQodGVtcERyb3BEb3duSW5mb1dyYXBlcik7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0SXRlbVdyYXBlci5hcHBlbmRDaGlsZCh0ZW1wRHJvcERvd25DYXJ0SXRlbSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHRlbXBCdXR0b24uaW5uZXJIVE1MID0gYDxidXR0b24gY2xhc3M9XCJidXR0b24gZHJvcGRvd25DYXJ0X19idXR0b25EZWxcIiBkYXRhLWJ1dHRvbl9uYW1lPVwiZGVsZXRlXCIgZGF0YS1pZF9wcm9kdWN0PVwiJHthcnJbaV0uaWRfcHJvZHVjdH1cIj54PC9idXR0b24+YDtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtLmFwcGVuZENoaWxkKHRlbXBCdXR0b24pO1xyXG5cclxuICAgICAgICAgICAgICAgIHByaWNlID0gcHJpY2UgKyBhcnJbaV0ucXVhbnRpdHkgKiBhcnJbaV0ucHJpY2U7XHJcbiAgICAgICAgICAgICAgICBhbW1vdW50ID0gYW1tb3VudCArIGFycltpXS5xdWFudGl0eTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbl9tb2RcIiBkYXRhLWJ1dHRvbl9uYW1lPVwiY2hlY2tcIj7QntGE0L7RgNC80LjRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbl9tb2RcIiBkYXRhLWJ1dHRvbl9uYW1lPVwiY2FydFwiPjxhIGhyZWY9XCIuLi9iaWdjYXJ0Lmh0bWxcIj7QmtC+0YDQt9C40L3QsDwvYT48L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uX21vZFwiIGRhdGEtYnV0dG9uX25hbWU9XCJjbGVhclwiPtCe0YfQuNGB0YLQuNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgZHJvcGRvd25DYXJ0X19idXR0b25XcmFwcGVyLmlubmVySFRNTCA9IGJ1dHRvbjtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdtaW5pQ2FydC5yZW5kZXIg0LLRi9Cy0L7QtNC40YIg0L/Rg9GB0YLRg9GOINGE0L7RgNC80YMg0LHQtdC3INGC0L7QstCw0YDQvtCyJyk7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wbGF0ZUl0ZW0gPSBgXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bkNhcnRfX2VtcHR5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImRyb3Bkb3duQ2FydF9faW1nQ2FydFwiPjxpIGNsYXNzPVwiZmEgZmEtc2hvcHBpbmctY2FydFwiPjwvaT48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cD7QkiDQutC+0YDQt9C40L3QtSDQvdC40YfQtdCz0L4g0L3QtdGCPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0LmlubmVySFRNTD10ZW1wbGF0ZUl0ZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYnV0dG9uQ2FydCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYGhlYWRlck1pZGRsZV9fbXlDYXJ0X21vZGApWzBdO1xyXG4gICAgICAgIGxldCBidXR0b25DYXJ0VGVtcGxhdGUgPSBgPHNwYW4gY2xhc3M9XCJ0ZXh0UGlua1wiPiR7YW1tb3VudH0mbmJzcFxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPtGC0L7QstCw0YDQvtCyLyZuYnNwPHNwYW4gY2xhc3M9XCJ0ZXh0UGlua1wiPiR7cHJpY2V9Jm5ic3A8L3NwYW4+0YDRg9CxYDtcclxuICAgICAgICBidXR0b25DYXJ0LmlubmVySFRNTCA9IGJ1dHRvbkNhcnRUZW1wbGF0ZTtcclxuXHJcbiAgICB9XHJcbn07XHJcbmxldCBsb2FkQ2F0YWxvZ0RhdGEgPSB7XHJcblxyXG4gICAgc2V0dGluZ3M6IHtcclxuICAgICAgICBkYXRhOiAnJyxcclxuICAgICAgICBsb2NhbENhdGFsb2dTdG9yYWdlTmFtZTogJ2NhdGFsb2dEYXRhJyxcclxuICAgICAgICBsb2NhbENhcnRTdG9yYWdlTmFtZTogJ2dldEJhc2tldCcsXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoc2V0dGluZ3MpIHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbigodGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnNldHRpbmdzLmxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lLCB0aGlzLnNldHRpbmdzLmRhdGEpO1xyXG4gICAgICAgIGxldCBkYXRhUGFyc2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVt0aGlzLnNldHRpbmdzLmxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lXSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeV9faXRlbVdyYXBwZXInKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHRoaXMuY2xpY2tIYW5kbGVyKGV2ZW50KSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQntCx0YDQsNCx0L7RgtC60LAg0LrQu9C40LrQsCDQv9C+INC60L3QvtC/0LrQtVxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIGNsaWNrSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgIT09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgYSBidXR0b24nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRDYXJ0KGV2ZW50LnRhcmdldC5kYXRhc2V0LmlkX3Byb2R1Y3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRDYXJ0KGlkX3Byb2R1Y3QpIHtcclxuXHJcbiAgICAgICAgbGV0IGNoZWNrQ29udGFpbiA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBkYXRhQ2FydCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zZXR0aW5ncy5sb2NhbENhcnRTdG9yYWdlTmFtZSkpO1xyXG4gICAgICAgIGlmIChkYXRhQ2FydC5jb250ZW50cy5sZW5ndGggIT09IG51bGwpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRhdGFDYXJ0LmNvbnRlbnRzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGlkX3Byb2R1Y3QpID09IHBhcnNlSW50KGRhdGFDYXJ0LmNvbnRlbnRzW2luZGV4XS5pZF9wcm9kdWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFDYXJ0LmNvbnRlbnRzW2luZGV4XS5xdWFudGl0eSA9IGRhdGFDYXJ0LmNvbnRlbnRzW2luZGV4XS5xdWFudGl0eSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5zZXR0aW5ncy5sb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YUNhcnQpKTtcclxuICAgICAgICAgICAgICAgICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0NvbnRhaW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNoZWNrQ29udGFpbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgaWYgKCFjaGVja0NvbnRhaW4pIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhSXRlbUZyb21DYXRhbG9nID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnNldHRpbmdzLmxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lKSlbcGFyc2VJbnQoaWRfcHJvZHVjdCAtIDEpXTtcclxuICAgICAgICAgICAgbGV0IGFyckxlZ3RoID0gZGF0YUNhcnQuY29udGVudHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBsZXQgYXJySXRlbSA9IHt9O1xyXG4gICAgICAgICAgICBhcnJJdGVtLmlkX3Byb2R1Y3QgPSBwYXJzZUludChpZF9wcm9kdWN0KTtcclxuICAgICAgICAgICAgYXJySXRlbS5pbWcgPSBkYXRhSXRlbUZyb21DYXRhbG9nLmltZztcclxuICAgICAgICAgICAgYXJySXRlbS5wcm9kdWN0X25hbWUgPSBkYXRhSXRlbUZyb21DYXRhbG9nLnByb2R1Y3RfbmFtZTtcclxuICAgICAgICAgICAgYXJySXRlbS5wcmljZSA9IGRhdGFJdGVtRnJvbUNhdGFsb2cucHJpY2U7XHJcbiAgICAgICAgICAgIGFyckl0ZW0ucXVhbnRpdHkgPSBwYXJzZUludCgxKTtcclxuICAgICAgICAgICAgZGF0YUNhcnQuY29udGVudHMucHVzaChhcnJJdGVtKTtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5zZXR0aW5ncy5sb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoZGF0YUNhcnQpKTtcclxuICAgICAgICAgICAgbWluaUNhcnQucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXIobG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUpIHtcclxuICAgICAgICBsZXQgZGF0YVBhcnNlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbbG9jYWxDYXRhbG9nU3RvcmFnZU5hbWVdKTtcclxuICAgICAgICBsZXQgZ2FsbGFyeVdyYXBwZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5X19pdGVtV3JhcHBlcicpWzBdO1xyXG4gICAgICAgIGxldCBnYWxsYXJ5SXRlbUNvbnRhaW5lciA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gZGF0YVBhcnNlLmxlbmd0aCAtIDE7IGluZGV4ID4gZGF0YVBhcnNlLmxlbmd0aCAtIDY7IGluZGV4LS0pIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBnYWxsZXJ5VGVtcGxhdGUgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5X19pdGVtXCI+XHJcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeV9fY29udGFpbmVySXRlbUltZ1wiPjxpbWcgY2xhc3M9XCJnYWxsZXJ5X19pdGVtSW1nXCIgc3JjPVwiaW1nLyR7ZGF0YVBhcnNlW2luZGV4XS5pbWd9XCJhbHQ9XCJcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxwIGNsYXNzPVwiZ2FsbGVyeV9faXRlbVRpdGxlXCI+JHtkYXRhUGFyc2VbaW5kZXhdLnByb2R1Y3RfbmFtZX08L3A+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj48cCBjbGFzcz1cImdhbGxlcnlfX2F0aW5nc1wiPioqKioqPC9wPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHAgY2xhc3M9XCJnYWxsZXJ5X19wcmljZVwiPiR7ZGF0YVBhcnNlW2luZGV4XS5wcmljZX0gJHtkYXRhUGFyc2VbaW5kZXhdLmN1cnJlbmN5fTwvcD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGdhbGxlcnlfX2l0ZW1CdXR0b25cIiBkYXRhLWlkX3Byb2R1Y3Q9XCIke2RhdGFQYXJzZVtpbmRleF0uaWRfcHJvZHVjdH1cIj7QlNC+0LHQsNCy0LjRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgIGdhbGxhcnlJdGVtQ29udGFpbmVyID0gZ2FsbGFyeUl0ZW1Db250YWluZXIgKyBnYWxsZXJ5VGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdhbGxhcnlXcmFwcGVyLmlubmVySFRNTCA9IGdhbGxhcnlJdGVtQ29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxufTsiXX0=
