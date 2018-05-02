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

function getJsonFetch(jsonFile, callback) {

    fetch('json/' + jsonFile).then(function (response) {
        return response.text();
    }).then(function (text) {
        console.log(text);
    }).catch(function (error) {
        console.log(error);
    });
}

getJsonFetch('../json/' + 'getBasket.json');
getJson('../json/' + 'getBasket.json', consoleL);

function consoleL(err) {
    console.log(err);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwibG9jYWxDYXJ0U3RvcmFnZU5hbWUiLCJsb2NhbENhdGFsb2dTdG9yYWdlTmFtZSIsIm1pbmlDYXJ0IiwiaW5pdCIsImdldEpzb24iLCJsb2FkQ2F0YWxvZ0RhdGEiLCJkYXRhIiwibG9jYWxTaG9wU3RvcmFnZSIsIm5hbWUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsImpzb25GaWxlIiwiY2FsbGJhY2siLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic2VuZCIsImdldEpzb25GZXRjaCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwidGV4dCIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlTCIsImVyciIsIndyYXBwZXJDbGFzcyIsImVtcHlDYXJ0IiwiYW1vdW4iLCJjb3VudEdvb2RzIiwiY29udGVudHMiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGlja0hhbmRsZXIiLCJldmVudCIsInJlbmRlciIsInRhcmdldCIsImRhdGFzZXQiLCJidXR0b25fbmFtZSIsImRlbGV0ZSIsImlkIiwiaWRfcHJvZHVjdCIsImFyciIsInBhcnNlIiwiaW5kZXgiLCJsZW5ndGgiLCJwYXJzZUludCIsInF1YW50aXR5Iiwic3BsaWNlIiwiYW1tb3VudCIsInByaWNlIiwidGVtcGxhdGVJdGVtQ29udGFpbmVyIiwidGVtcERyb3BEb3duQ2FydCIsImlubmVySFRNTCIsInRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlciIsImFwcGVuZENoaWxkIiwiaSIsInRlbXBEcm9wRG93bkNhcnRJdGVtIiwiaW1nIiwidGVtcERyb3BEb3duSW5mb1dyYXBlciIsInBQcmljZSIsInBEZXNjciIsInByb2R1Y3RfbmFtZSIsInRlbXBCdXR0b24iLCJidXR0b24iLCJ0ZW1wbGF0ZUl0ZW0iLCJidXR0b25DYXJ0IiwiYnV0dG9uQ2FydFRlbXBsYXRlIiwic2V0dGluZ3MiLCJPYmplY3QiLCJhc3NpZ24iLCJkYXRhUGFyc2UiLCJ0YWdOYW1lIiwiYWRkQ2FydCIsImNoZWNrQ29udGFpbiIsImRhdGFDYXJ0IiwiZGF0YUl0ZW1Gcm9tQ2F0YWxvZyIsImFyckxlZ3RoIiwiYXJySXRlbSIsInB1c2giLCJnYWxsYXJ5V3JhcHBlciIsImdhbGxhcnlJdGVtQ29udGFpbmVyIiwiZ2FsbGVyeVRlbXBsYXRlIiwiY3VycmVuY3kiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7OztBQU1BQSxPQUFPQyxNQUFQLEdBQWdCLFlBQVk7O0FBRXhCLFFBQUlDLHVCQUF1QixVQUEzQjtBQUNBLFFBQUlDLDBCQUEwQixhQUE5Qjs7QUFFQTs7QUFFQTs7QUFFQUMsYUFBU0MsSUFBVDs7QUFHQUMsWUFBUSxrQkFBUixFQUE0QjtBQUFBLGVBQVFDLGdCQUFnQkYsSUFBaEIsQ0FBcUI7QUFDckRHLHNCQURxRDtBQUVyREwsNERBRnFEO0FBR3JERDtBQUhxRCxTQUFyQixDQUFSO0FBQUEsS0FBNUI7QUFPSCxDQW5CRDs7QUFzQkE7Ozs7Ozs7QUFPQTs7QUFFQSxTQUFTTyxnQkFBVCxDQUEwQkMsSUFBMUIsRUFBZ0M7O0FBRTVCO0FBQ0FDLGlCQUFhRCxJQUFiLElBQXFCLEVBQXJCOztBQUVBLFFBQUlDLGFBQWFDLE9BQWIsQ0FBcUJGLElBQXJCLE1BQStCLElBQW5DLEVBQXlDO0FBQ3JDO0FBQ0EsZUFBTyxDQUFQO0FBQ0gsS0FIRCxNQUdPO0FBQ0hHLGdCQUFRQyxHQUFSLDZKQUE4Q0osSUFBOUM7QUFDQSxlQUFPLENBQVA7QUFDSDtBQUVKO0FBQ0Q7Ozs7Ozs7QUFPQSxTQUFTSixPQUFULENB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LGlCQUFpQnJELFNBQVNDLHNCQUFULENBQWdDLHNCQUFoQyxFQUF3RCxDQUF4RCxDQUFyQjtBQUNBLFlBQUlxRCx1QkFBdUIsRUFBM0I7QUFDQSxhQUFLLElBQUl4QyxRQUFROEIsVUFBVTdCLE1BQVYsR0FBbUIsQ0FBcEMsRUFBdUNELFFBQVE4QixVQUFVN0IsTUFBVixHQUFtQixDQUFsRSxFQUFxRUQsT0FBckUsRUFBOEU7O0FBRTFFLGdCQUFJeUMsNkpBRTZFWCxVQUFVOUIsS0FBVixFQUFpQmlCLEdBRjlGLCtFQUd5Q2EsVUFBVTlCLEtBQVYsRUFBaUJxQixZQUgxRCw0SUFLcUNTLFVBQVU5QixLQUFWLEVBQWlCTSxLQUx0RCxTQUsrRHdCLFVBQVU5QixLQUFWLEVBQWlCMEMsUUFMaEYsbUlBT3NFWixVQUFVOUIsS0FBVixFQUFpQkgsVUFQdkYsZ0hBQUo7QUFVQTJDLG1DQUF1QkEsdUJBQXVCQyxlQUE5QztBQUNIO0FBQ0RGLHVCQUFlOUIsU0FBZixHQUEyQitCLG9CQUEzQjtBQUNIO0FBbkZpQixDQUF0QiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKlxyXG4gKiDQodCx0L7RgNC60LAg0YTQsNC70L7QsiBKUyDRgdGC0L7RgNC+0L3QvdC40YVcclxuICogLy89IC4uLy4uL2Jvd2VyX2NvbXBvbmVudHMvanF1ZXJ5L2Rpc3QvanF1ZXJ5LmpzXHJcbiAqL1xyXG5cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgbGV0IGxvY2FsQ2FydFN0b3JhZ2VOYW1lID0gJ21pbmlDYXJ0JztcclxuICAgIGxldCBsb2NhbENhdGFsb2dTdG9yYWdlTmFtZSA9ICdjYXRhbG9nRGF0YSc7XHJcblxyXG4gICAgLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcblxyXG4gICAgLy8gZ2V0SnNvbignZ2V0QmFza2V0Lmpzb24nLCBkYXRhID0+IG1pbmlDYXJ0LmluaXQoZGF0YSxsb2NhbENhcnRTdG9yYWdlTmFtZSkpO1xyXG5cclxuICAgIG1pbmlDYXJ0LmluaXQoKTtcclxuXHJcblxyXG4gICAgZ2V0SnNvbignY2F0YWxvZ0RhdGEuanNvbicsIGRhdGEgPT4gbG9hZENhdGFsb2dEYXRhLmluaXQoe1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUsXHJcbiAgICAgICAgbG9jYWxDYXJ0U3RvcmFnZU5hbWVcclxuICAgIH0pKTtcclxuXHJcblxyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqINCf0L7QtNC70Y7Rh9C10L3QuNC1INGB0LLQvtC40YUg0YTQsNC50LvQvtCyIEpTINC00LvRjyDRgdCx0L7RgNC60LhcclxuICogLy89IHBhcnRzL2FwcC5qc1xyXG4gKiAvLz0gcGFydHMvaGVhZGVyLmpzXHJcbiAqIC8vPSBwYXJ0cy9mb290ZXIuanNcclxuICovXHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcbmZ1bmN0aW9uIGxvY2FsU2hvcFN0b3JhZ2UobmFtZSkge1xyXG5cclxuICAgIC8vIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgbG9jYWxTdG9yYWdlW25hbWVdID0gJyc7XHJcblxyXG4gICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpICE9PSBudWxsKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coYNGF0YDQsNC90LjQu9C40YnQtSAke25hbWV9INGB0YPRidC10YHRgtCy0YPQtdGCYCk7XHJcbiAgICAgICAgcmV0dXJuIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGDRh9GC0L4t0YLQviDQv9C+0YjQu9C+INC90LUg0YLQsNC6LCDRhdGA0LDQvdC40LvQuNGJ0LUgJHtuYW1lfSDQvdC10YHRg9GJ0LXRgdGC0LLRg9C10YJgKTtcclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuXHJcbn1cclxuLyoqXHJcbiAqINCk0YPQvdC60YbQuNGPINGH0YLQtdC90LjRjyBKU09OINGE0LDQudC70L7QslxyXG4gKiBAcGFyYW0ganNvbkZpbGVcclxuICogQHBhcmFtIGNhbGxiYWNrINCk0YPQvdC60YbQuNGPINCyINC60L7RgtC+0YDRg9GOINCy0L7Qt9Cy0YDQsNGJ0LDQtdC8INGA0LXQt9GD0LvRjNGC0LDRgiBQQVJTRSDQuCDQvdCw0LfQstCw0L3QuNC1XHJcbiAqINC60LvQsNGB0YHQsCDQvtCx0LXRgNGC0LrQuCDRgtC+0LLQsNGA0LBcclxuICovXHJcblxyXG5mdW5jdGlvbiBnZXRKc29uKGpzb25GaWxlLCBjYWxsYmFjaykge1xyXG5cclxuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIHhoci5vcGVuKCdHRVQnLCAnanNvbi8nICsganNvbkZpbGUsIHRydWUpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQgJiYgeGhyLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfRgdGC0LDRgtGD0YEg0LPQvtGC0L7QstC+Jyk7XHJcbiAgICAgICAgICAgIC8vIGNhbGxiYWNrKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCksIHdyYXBwZXJDbGFzcyk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCh4aHIucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ9GB0YLQsNGC0YPRgSDQs9C+0YLQvtCy0L3QvtGB0YLQuCAnICsgeGhyLnJlYWR5U3RhdGUpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn0YHRgtCw0YLRg9GBICcgKyB4aHIuc3RhdHVzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0SnNvbkZldGNoKGpzb25GaWxlLCBjYWxsYmFjaykge1xyXG5cclxuICAgZmV0Y2goJ2pzb24vJyArIGpzb25GaWxlKVxyXG4gICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UudGV4dCgpKVxyXG4gICAgICAgLnRoZW4odGV4dCA9PiB7XHJcbiAgICAgICAgICAgY29uc29sZS5sb2codGV4dClcclxuICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgfSlcclxufVxyXG5cclxuZ2V0SnNvbkZldGNoKCcuLi9qc29uLycgKyAnZ2V0QmFza2V0Lmpzb24nKTtcclxuZ2V0SnNvbignLi4vanNvbi8nICsgJ2dldEJhc2tldC5qc29uJywgY29uc29sZUwpO1xyXG5cclxuZnVuY3Rpb24gY29uc29sZUwoZXJyKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnIpXHJcbn1cclxubGV0IHdyYXBwZXJDbGFzcyA9ICdkcm9wZG93bkNhcnQnO1xyXG5sZXQgbG9jYWxDYXJ0U3RvcmFnZU5hbWUgPSAnbWluaUNhcnQnO1xyXG5cclxubGV0IG1pbmlDYXJ0ID0ge1xyXG5cclxuICAgIC8vIGluaXQoZGF0YSwgbG9jYWxDYXJ0U3RvcmFnZU5hbWUpIHtcclxuICAgIC8vICAgICBsb2NhbFN0b3JhZ2VbbG9jYWxDYXJ0U3RvcmFnZU5hbWVdID0gZGF0YTtcclxuICAgIC8vICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgLy8gfSxcclxuXHJcbiAgICBlbXB5Q2FydDoge1xyXG4gICAgICAgIGFtb3VuOiAwLFxyXG4gICAgICAgIGNvdW50R29vZHM6IDAsXHJcbiAgICAgICAgY29udGVudHM6IFtdXHJcbiAgICB9LFxyXG5cclxuICAgIGluaXQoKSB7XHJcblxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSkgPT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsQ2FydFN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShtaW5pQ2FydC5lbXB5Q2FydCkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHdyYXBwZXJDbGFzcylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGljayA9PiB0aGlzLmNsaWNrSGFuZGxlcihldmVudCkpO1xyXG4gICAgICAgICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUod3JhcHBlckNsYXNzKVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsaWNrID0+IHRoaXMuY2xpY2tIYW5kbGVyKGV2ZW50KSk7XHJcbiAgICAgICAgICAgIG1pbmlDYXJ0LnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBjbGlja0hhbmRsZXIoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBpZiAoZXZlbnQudGFyZ2V0LmRhdGFzZXQuYnV0dG9uX25hbWUgPT09ICdjbGVhcicpIHtcclxuICAgICAgICAvLyAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KG1pbmlDYXJ0LmVtcHlDYXJ0KSk7XHJcbiAgICAgICAgLy8gICAgIG1pbmlDYXJ0LnJlbmRlcigpO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC50YXJnZXQuZGF0YXNldC5idXR0b25fbmFtZSkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnY2xlYXInOlxyXG5cclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsQ2FydFN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShtaW5pQ2FydC5lbXB5Q2FydCkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdkZWxldGUnOlxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlKGV2ZW50KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1pbmlDYXJ0LnJlbmRlcigpO1xyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGRlbGV0ZShldmVudCkge1xyXG5cclxuICAgICAgICBsZXQgaWQgPSBldmVudC50YXJnZXQuZGF0YXNldC5pZF9wcm9kdWN0O1xyXG4gICAgICAgIGxldCBhcnIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGxvY2FsQ2FydFN0b3JhZ2VOYW1lKSk7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXg9MDsgaW5kZXggPCBhcnIuY29udGVudHMubGVuZ3RoO2luZGV4Kyspe1xyXG4gICAgICAgICAgICBpZiAocGFyc2VJbnQoYXJyLmNvbnRlbnRzW2luZGV4XS5pZF9wcm9kdWN0KSA9PT0gcGFyc2VJbnQoaWQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KGFyci5jb250ZW50c1tpbmRleF0ucXVhbnRpdHkpPjEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5jb250ZW50c1tpbmRleF0ucXVhbnRpdHkgPSBhcnIuY29udGVudHNbaW5kZXhdLnF1YW50aXR5IC0gMTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFyci5jb250ZW50cy5zcGxpY2UoaW5kZXgsMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsQ2FydFN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShhcnIpKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcigpIHtcclxuXHJcbiAgICAgICAgbGV0IGFtbW91bnQgPSAwO1xyXG4gICAgICAgIGxldCBwcmljZSA9IDA7XHJcbiAgICAgICAgbGV0IHRlbXBsYXRlSXRlbUNvbnRhaW5lciA9ICcnO1xyXG5cclxuICAgICAgICBsZXQgYXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIm1pbmlDYXJ0XCIpKS5jb250ZW50cztcclxuXHJcbiAgICAgICAgbGV0IHRlbXBEcm9wRG93bkNhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdkcm9wZG93bkNhcnQnKVswXTtcclxuICAgICAgICB0ZW1wRHJvcERvd25DYXJ0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoICE9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgdGVtcERyb3BEb3duQ2FydEl0ZW1XcmFwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydEl0ZW1XcmFwZXIuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duQ2FydF9faXRlbVdyYXBlcic7XHJcblxyXG4gICAgICAgICAgICBsZXQgZHJvcGRvd25DYXJ0X19idXR0b25XcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlci5jbGFzc05hbWUgPSAnZHJvcGRvd25DYXJ0X19idXR0b25XcmFwcGVyJztcclxuXHJcbiAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnQuYXBwZW5kQ2hpbGQodGVtcERyb3BEb3duQ2FydEl0ZW1XcmFwZXIpO1xyXG4gICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0LmFwcGVuZENoaWxkKGRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlcik7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRHJvcERvd25DYXJ0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydEl0ZW0uY2xhc3NOYW1lID0nZHJvcGRvd25DYXJ0X19pdGVtJztcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtLmlubmVySFRNTCA9IGA8aW1nIGNsYXNzPVwiZHJvcGRvd25DYXJ0X19pbWdcIiBzcmM9XCJpbWcvJHthcnJbaV0uaW1nfVwiIGFsdD1cIlwiPmA7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBEcm9wRG93bkluZm9XcmFwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkluZm9XcmFwZXIuY2xhc3NOYW1lID0nZHJvcGRvd25DYXJ0X19pbmZvV3JhcHBlcic7XHJcbiAgICAgICAgICAgICAgICBsZXQgcFByaWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICAgICAgcFByaWNlLmNsYXNzTmFtZSA9ICdkcm9wZG93bkNhcnRfX3ByaWNlJztcclxuICAgICAgICAgICAgICAgIHBQcmljZS5pbm5lckhUTUwgPSBgJHthcnJbaV0ucXVhbnRpdHl9IHggJHthcnJbaV0ucHJpY2V9INGA0YPQsS5gO1xyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duSW5mb1dyYXBlci5hcHBlbmRDaGlsZChwUHJpY2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBEZXNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgICAgIHBEZXNjci5jbGFzc05hbWUgPSAnZHJvcGRvd25DYXJ0X19kZXNjcmlwdGlvbic7XHJcbiAgICAgICAgICAgICAgICBwRGVzY3IuaW5uZXJIVE1MID0gYCR7YXJyW2ldLnByb2R1Y3RfbmFtZX1gO1xyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duSW5mb1dyYXBlci5hcHBlbmRDaGlsZChwRGVzY3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtLmFwcGVuZENoaWxkKHRlbXBEcm9wRG93bkluZm9XcmFwZXIpO1xyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydEl0ZW1XcmFwZXIuYXBwZW5kQ2hpbGQodGVtcERyb3BEb3duQ2FydEl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wQnV0dG9uLmlubmVySFRNTCA9IGA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uRGVsXCIgZGF0YS1idXR0b25fbmFtZT1cImRlbGV0ZVwiIGRhdGEtaWRfcHJvZHVjdD1cIiR7YXJyW2ldLmlkX3Byb2R1Y3R9XCI+eDwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0SXRlbS5hcHBlbmRDaGlsZCh0ZW1wQnV0dG9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmljZSA9IHByaWNlICsgYXJyW2ldLnF1YW50aXR5ICogYXJyW2ldLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgYW1tb3VudCA9IGFtbW91bnQgKyBhcnJbaV0ucXVhbnRpdHk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gZHJvcGRvd25DYXJ0X19idXR0b24gZHJvcGRvd25DYXJ0X19idXR0b25fbW9kXCIgZGF0YS1idXR0b25fbmFtZT1cImNoZWNrXCI+0J7RhNC+0YDQvNC40YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gZHJvcGRvd25DYXJ0X19idXR0b24gZHJvcGRvd25DYXJ0X19idXR0b25fbW9kXCIgZGF0YS1idXR0b25fbmFtZT1cImNhcnRcIj48YSBocmVmPVwiLi4vYmlnY2FydC5odG1sXCI+0JrQvtGA0LfQuNC90LA8L2E+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbl9tb2RcIiBkYXRhLWJ1dHRvbl9uYW1lPVwiY2xlYXJcIj7QntGH0LjRgdGC0LjRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIGRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlci5pbm5lckhUTUwgPSBidXR0b247XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbWluaUNhcnQucmVuZGVyINCy0YvQstC+0LTQuNGCINC/0YPRgdGC0YPRjiDRhNC+0YDQvNGDINCx0LXQtyDRgtC+0LLQsNGA0L7QsicpO1xyXG4gICAgICAgICAgICBsZXQgdGVtcGxhdGVJdGVtID0gYFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd25DYXJ0X19lbXB0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJkcm9wZG93bkNhcnRfX2ltZ0NhcnRcIj48aSBjbGFzcz1cImZhIGZhLXNob3BwaW5nLWNhcnRcIj48L2k+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHA+0JIg0LrQvtGA0LfQuNC90LUg0L3QuNGH0LXQs9C+INC90LXRgjwvcD5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydC5pbm5lckhUTUw9dGVtcGxhdGVJdGVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJ1dHRvbkNhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBoZWFkZXJNaWRkbGVfX215Q2FydF9tb2RgKVswXTtcclxuICAgICAgICBsZXQgYnV0dG9uQ2FydFRlbXBsYXRlID0gYDxzcGFuIGNsYXNzPVwidGV4dFBpbmtcIj4ke2FtbW91bnR9Jm5ic3BcclxuICAgICAgICAgICAgICAgIDwvc3Bhbj7RgtC+0LLQsNGA0L7Qsi8mbmJzcDxzcGFuIGNsYXNzPVwidGV4dFBpbmtcIj4ke3ByaWNlfSZuYnNwPC9zcGFuPtGA0YPQsWA7XHJcbiAgICAgICAgYnV0dG9uQ2FydC5pbm5lckhUTUwgPSBidXR0b25DYXJ0VGVtcGxhdGU7XHJcblxyXG4gICAgfVxyXG59O1xyXG5sZXQgbG9hZENhdGFsb2dEYXRhID0ge1xyXG5cclxuICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgZGF0YTogJycsXHJcbiAgICAgICAgbG9jYWxDYXRhbG9nU3RvcmFnZU5hbWU6ICdjYXRhbG9nRGF0YScsXHJcbiAgICAgICAgbG9jYWxDYXJ0U3RvcmFnZU5hbWU6ICdnZXRCYXNrZXQnLFxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KHNldHRpbmdzKSB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oKHRoaXMuc2V0dGluZ3MsIHNldHRpbmdzKSk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZSwgdGhpcy5zZXR0aW5ncy5kYXRhKTtcclxuICAgICAgICBsZXQgZGF0YVBhcnNlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbdGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZV0pO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc2V0dGluZ3MubG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbGxlcnlfX2l0ZW1XcmFwcGVyJylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0aGlzLmNsaWNrSGFuZGxlcihldmVudCkpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog0J7QsdGA0LDQsdC+0YLQutCwINC60LvQuNC60LAg0L/QviDQutC90L7Qv9C60LVcclxuICAgICAqIEBwYXJhbSBldmVudFxyXG4gICAgICovXHJcbiAgICBjbGlja0hhbmRsZXIoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC50YWdOYW1lICE9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IGEgYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkQ2FydChldmVudC50YXJnZXQuZGF0YXNldC5pZF9wcm9kdWN0KTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkQ2FydChpZF9wcm9kdWN0KSB7XHJcblxyXG4gICAgICAgIGxldCBjaGVja0NvbnRhaW4gPSBmYWxzZTtcclxuICAgICAgICBsZXQgZGF0YUNhcnQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXJ0U3RvcmFnZU5hbWUpKTtcclxuICAgICAgICBpZiAoZGF0YUNhcnQuY29udGVudHMubGVuZ3RoICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkYXRhQ2FydC5jb250ZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChpZF9wcm9kdWN0KSA9PSBwYXJzZUludChkYXRhQ2FydC5jb250ZW50c1tpbmRleF0uaWRfcHJvZHVjdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhQ2FydC5jb250ZW50c1tpbmRleF0ucXVhbnRpdHkgPSBkYXRhQ2FydC5jb250ZW50c1tpbmRleF0ucXVhbnRpdHkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGFDYXJ0KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluaUNhcnQucmVuZGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tDb250YWluID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaGVja0NvbnRhaW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIGlmICghY2hlY2tDb250YWluKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YUl0ZW1Gcm9tQ2F0YWxvZyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZSkpW3BhcnNlSW50KGlkX3Byb2R1Y3QgLSAxKV07XHJcbiAgICAgICAgICAgIGxldCBhcnJMZWd0aCA9IGRhdGFDYXJ0LmNvbnRlbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgbGV0IGFyckl0ZW0gPSB7fTtcclxuICAgICAgICAgICAgYXJySXRlbS5pZF9wcm9kdWN0ID0gcGFyc2VJbnQoaWRfcHJvZHVjdCk7XHJcbiAgICAgICAgICAgIGFyckl0ZW0uaW1nID0gZGF0YUl0ZW1Gcm9tQ2F0YWxvZy5pbWc7XHJcbiAgICAgICAgICAgIGFyckl0ZW0ucHJvZHVjdF9uYW1lID0gZGF0YUl0ZW1Gcm9tQ2F0YWxvZy5wcm9kdWN0X25hbWU7XHJcbiAgICAgICAgICAgIGFyckl0ZW0ucHJpY2UgPSBkYXRhSXRlbUZyb21DYXRhbG9nLnByaWNlO1xyXG4gICAgICAgICAgICBhcnJJdGVtLnF1YW50aXR5ID0gcGFyc2VJbnQoMSk7XHJcbiAgICAgICAgICAgIGRhdGFDYXJ0LmNvbnRlbnRzLnB1c2goYXJySXRlbSk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGFDYXJ0KSk7XHJcbiAgICAgICAgICAgIG1pbmlDYXJ0LnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyKGxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lKSB7XHJcbiAgICAgICAgbGV0IGRhdGFQYXJzZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2xvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lXSk7XHJcbiAgICAgICAgbGV0IGdhbGxhcnlXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeV9faXRlbVdyYXBwZXInKVswXTtcclxuICAgICAgICBsZXQgZ2FsbGFyeUl0ZW1Db250YWluZXIgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IGRhdGFQYXJzZS5sZW5ndGggLSAxOyBpbmRleCA+IGRhdGFQYXJzZS5sZW5ndGggLSA2OyBpbmRleC0tKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ2FsbGVyeVRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeV9faXRlbVwiPlxyXG4gICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnlfX2NvbnRhaW5lckl0ZW1JbWdcIj48aW1nIGNsYXNzPVwiZ2FsbGVyeV9faXRlbUltZ1wiIHNyYz1cImltZy8ke2RhdGFQYXJzZVtpbmRleF0uaW1nfVwiYWx0PVwiXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj48cCBjbGFzcz1cImdhbGxlcnlfX2l0ZW1UaXRsZVwiPiR7ZGF0YVBhcnNlW2luZGV4XS5wcm9kdWN0X25hbWV9PC9wPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHAgY2xhc3M9XCJnYWxsZXJ5X19hdGluZ3NcIj4qKioqKjwvcD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxwIGNsYXNzPVwiZ2FsbGVyeV9fcHJpY2VcIj4ke2RhdGFQYXJzZVtpbmRleF0ucHJpY2V9ICR7ZGF0YVBhcnNlW2luZGV4XS5jdXJyZW5jeX08L3A+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBnYWxsZXJ5X19pdGVtQnV0dG9uXCIgZGF0YS1pZF9wcm9kdWN0PVwiJHtkYXRhUGFyc2VbaW5kZXhdLmlkX3Byb2R1Y3R9XCI+0JTQvtCx0LDQstC40YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICBnYWxsYXJ5SXRlbUNvbnRhaW5lciA9IGdhbGxhcnlJdGVtQ29udGFpbmVyICsgZ2FsbGVyeVRlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnYWxsYXJ5V3JhcHBlci5pbm5lckhUTUwgPSBnYWxsYXJ5SXRlbUNvbnRhaW5lcjtcclxuICAgIH1cclxuXHJcbn07Il19
