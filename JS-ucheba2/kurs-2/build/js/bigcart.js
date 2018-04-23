"use strict";

/*
 * Сборка фалов JS сторонних
 * //= ../../bower_components/jquery/dist/jquery.js
 */

"use strict";

function localShopStorage(name) {

    // localStorage.clear();
    localStorage[name] = '';

    if (localStorage.getItem(name) !== null) {
        // console.log(`хранилище ${name} существует`);
        return 1;
    } else {
        console.log("\u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A, \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 " + name + " \u043D\u0435\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442");
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
                tempDropDownCartItem.innerHTML = "<img class=\"dropdownCart__img\" src=\"img/" + arr[i].img + "\" alt=\"\">";

                var tempDropDownInfoWraper = document.createElement('div');
                tempDropDownInfoWraper.className = 'dropdownCart__infoWrapper';
                var pPrice = document.createElement('p');
                pPrice.className = 'dropdownCart__price';
                pPrice.innerHTML = arr[i].quantity + " x " + arr[i].price + " \u0440\u0443\u0431.";
                tempDropDownInfoWraper.appendChild(pPrice);
                var pDescr = document.createElement('p');
                pDescr.className = 'dropdownCart__description';
                pDescr.innerHTML = "" + arr[i].product_name;
                tempDropDownInfoWraper.appendChild(pDescr);

                tempDropDownCartItem.appendChild(tempDropDownInfoWraper);
                tempDropDownCartItemWraper.appendChild(tempDropDownCartItem);

                var tempButton = document.createElement('div');
                tempButton.innerHTML = "<button class=\"button dropdownCart__buttonDel\" data-button_name=\"delete\" data-id_product=\"" + arr[i].id_product + "\">x</button>";
                tempDropDownCartItem.appendChild(tempButton);

                price = price + arr[i].quantity * arr[i].price;
                ammount = ammount + arr[i].quantity;
            }

            var button = "\n                    <button class=\"button dropdownCart__button dropdownCart__button_mod\" data-button_name=\"check\">\u041E\u0444\u043E\u0440\u043C\u0438\u0442\u044C</button>\n                    <button class=\"button dropdownCart__button dropdownCart__button_mod\" data-button_name=\"cart\"><a href=\"../bigcart.html\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</a></button>\n                    <button class=\"button dropdownCart__button dropdownCart__button_mod\" data-button_name=\"clear\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C</button>\n                    ";

            dropdownCart__buttonWrapper.innerHTML = button;
        } else {

            // console.log('miniCart.render выводит пустую форму без товаров');
            var templateItem = "\n                  <div class=\"dropdownCart__empty\">\n                      <p class=\"dropdownCart__imgCart\"><i class=\"fa fa-shopping-cart\"></i></p>\n                      <p>\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442</p>\n                   </div>\n            ";

            tempDropDownCart.innerHTML = templateItem;
        }

        var buttonCart = document.getElementsByClassName("headerMiddle__myCart_mod")[0];
        var buttonCartTemplate = "<span class=\"textPink\">" + ammount + "&nbsp\n                </span>\u0442\u043E\u0432\u0430\u0440\u043E\u0432/&nbsp<span class=\"textPink\">" + price + "&nbsp</span>\u0440\u0443\u0431";
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

            var galleryTemplate = "\n            <div class=\"gallery__item\">\n             <div class=\"gallery__containerItemImg\"><img class=\"gallery__itemImg\" src=\"img/" + dataParse[index].img + "\"alt=\"\"></div>\n                    <div><p class=\"gallery__itemTitle\">" + dataParse[index].product_name + "</p></div>\n                    <div><p class=\"gallery__atings\">*****</p></div>\n                    <div><p class=\"gallery__price\">" + dataParse[index].price + " " + dataParse[index].currency + "</p></div>\n                    <div>\n                        <button class=\"button gallery__itemButton\" data-id_product=\"" + dataParse[index].id_product + "\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n                    </div>\n            </div>";
            gallaryItemContainer = gallaryItemContainer + galleryTemplate;
        }
        gallaryWrapper.innerHTML = gallaryItemContainer;
    }
};

window.onload = function () {

    miniCart.init();
};

/*
 * Подлючение своих файлов JS для сборки
 * //= parts/app.js
 * //= parts/header.js
 * //= parts/footer.js
 */
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJpZ2NhcnQuanMiXSwibmFtZXMiOlsibG9jYWxTaG9wU3RvcmFnZSIsIm5hbWUiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiY29uc29sZSIsImxvZyIsImdldEpzb24iLCJqc29uRmlsZSIsImNhbGxiYWNrIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlVGV4dCIsInNlbmQiLCJ3cmFwcGVyQ2xhc3MiLCJsb2NhbENhcnRTdG9yYWdlTmFtZSIsIm1pbmlDYXJ0IiwiZW1weUNhcnQiLCJhbW91biIsImNvdW50R29vZHMiLCJjb250ZW50cyIsImluaXQiLCJzZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGlja0hhbmRsZXIiLCJldmVudCIsInJlbmRlciIsInRhcmdldCIsImRhdGFzZXQiLCJidXR0b25fbmFtZSIsImRlbGV0ZSIsImlkIiwiaWRfcHJvZHVjdCIsImFyciIsInBhcnNlIiwiaW5kZXgiLCJsZW5ndGgiLCJwYXJzZUludCIsInF1YW50aXR5Iiwic3BsaWNlIiwiYW1tb3VudCIsInByaWNlIiwidGVtcGxhdGVJdGVtQ29udGFpbmVyIiwidGVtcERyb3BEb3duQ2FydCIsImlubmVySFRNTCIsInRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsImRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlciIsImFwcGVuZENoaWxkIiwiaSIsInRlbXBEcm9wRG93bkNhcnRJdGVtIiwiaW1nIiwidGVtcERyb3BEb3duSW5mb1dyYXBlciIsInBQcmljZSIsInBEZXNjciIsInByb2R1Y3RfbmFtZSIsInRlbXBCdXR0b24iLCJidXR0b24iLCJ0ZW1wbGF0ZUl0ZW0iLCJidXR0b25DYXJ0IiwiYnV0dG9uQ2FydFRlbXBsYXRlIiwibG9hZENhdGFsb2dEYXRhIiwic2V0dGluZ3MiLCJkYXRhIiwibG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUiLCJPYmplY3QiLCJhc3NpZ24iLCJkYXRhUGFyc2UiLCJ0YWdOYW1lIiwiYWRkQ2FydCIsImNoZWNrQ29udGFpbiIsImRhdGFDYXJ0IiwiZGF0YUl0ZW1Gcm9tQ2F0YWxvZyIsImFyckxlZ3RoIiwiYXJySXRlbSIsInB1c2giLCJnYWxsYXJ5V3JhcHBlciIsImdhbGxhcnlJdGVtQ29udGFpbmVyIiwiZ2FsbGVyeVRlbXBsYXRlIiwiY3VycmVuY3kiLCJ3aW5kb3ciLCJvbmxvYWQiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7OztBQUtBOztBQUVBLFNBQVNBLGdCQUFULENBQTBCQyxJQUExQixFQUFnQzs7QUFFNUI7QUFDQUMsaUJBQWFELElBQWIsSUFBcUIsRUFBckI7O0FBRUEsUUFBSUMsYUFBYUMsT0FBYixDQUFxQkYsSUFBckIsTUFBK0IsSUFBbkMsRUFBeUM7QUFDckM7QUFDQSxlQUFPLENBQVA7QUFDSCxLQUhELE1BR087QUFDSEcsZ0JBQVFDLEdBQVIsNkpBQThDSixJQUE5QztBQUNBLGVBQU8sQ0FBUDtBQUNIO0FBRUo7QUFDRDs7Ozs7OztBQU9BLFNBQVNLLE9BQVQsQ0FBaUJDLFFBQWpCLEVBQTJCQyxRQUEzQixFQUFxQzs7QUFFakMsUUFBSUMsTUFBTSxJQUFJQyxjQUFKLEVBQVY7QUFDQUQsUUFBSUUsSUFBSixDQUFTLEtBQVQsRUFBZ0IsVUFBVUosUUFBMUIsRUFBb0MsSUFBcEM7QUFDQUUsUUFBSUcsa0JBQUosR0FBeUIsWUFBWTtBQUNqQyxZQUFJSCxJQUFJSSxVQUFKLEtBQW1CLENBQW5CLElBQXdCSixJQUFJSyxNQUFKLEtBQWUsR0FBM0MsRUFBZ0Q7QUFDNUM7QUFDQTtBQUNBTixxQkFBVUMsSUFBSU0sWUFBZDtBQUNILFNBSkQsTUFJTztBQUNIO0FBQ0E7QUFDSDtBQUNKLEtBVEQ7QUFVQU4sUUFBSU8sSUFBSjtBQUNIO0FBQ0QsSUFBSUMs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QWYsQ0FBekQ7QUFDQTVELHFCQUFTYyxNQUFUO0FBQ0g7QUFDSixLQTlEaUI7QUFnRWxCQSxVQWhFa0Isa0JBZ0VYdUMsdUJBaEVXLEVBZ0VjO0FBQzVCLFlBQUlHLFlBQVlqRCxLQUFLZSxLQUFMLENBQVd2QyxhQUFhc0UsdUJBQWIsQ0FBWCxDQUFoQjtBQUNBLFlBQUlZLGlCQUFpQnhELFNBQVNDLHNCQUFULENBQWdDLHNCQUFoQyxFQUF3RCxDQUF4RCxDQUFyQjtBQUNBLFlBQUl3RCx1QkFBdUIsRUFBM0I7QUFDQSxhQUFLLElBQUkzQyxRQUFRaUMsVUFBVWhDLE1BQVYsR0FBbUIsQ0FBcEMsRUFBdUNELFFBQVFpQyxVQUFVaEMsTUFBVixHQUFtQixDQUFsRSxFQUFxRUQsT0FBckUsRUFBOEU7O0FBRTFFLGdCQUFJNEMsb0tBRTZFWCxVQUFVakMsS0FBVixFQUFpQmlCLEdBRjlGLG9GQUd5Q2dCLFVBQVVqQyxLQUFWLEVBQWlCcUIsWUFIMUQsZ0pBS3FDWSxVQUFVakMsS0FBVixFQUFpQk0sS0FMdEQsU0FLK0QyQixVQUFVakMsS0FBVixFQUFpQjZDLFFBTGhGLHNJQU9zRVosVUFBVWpDLEtBQVYsRUFBaUJILFVBUHZGLGlIQUFKO0FBVUE4QyxtQ0FBdUJBLHVCQUF1QkMsZUFBOUM7QUFDSDtBQUNERix1QkFBZWpDLFNBQWYsR0FBMkJrQyxvQkFBM0I7QUFDSDtBQW5GaUIsQ0FBdEI7O0FBd0ZBRyxPQUFPQyxNQUFQLEdBQWdCLFlBQVk7O0FBRXhCdEUsYUFBU0ssSUFBVDtBQUlILENBTkQ7O0FBU0EiLCJmaWxlIjoiYmlnY2FydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLypcclxuICog0KHQsdC+0YDQutCwINGE0LDQu9C+0LIgSlMg0YHRgtC+0YDQvtC90L3QuNGFXHJcbiAqIC8vPSAuLi8uLi9ib3dlcl9jb21wb25lbnRzL2pxdWVyeS9kaXN0L2pxdWVyeS5qc1xyXG4gKi9cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuZnVuY3Rpb24gbG9jYWxTaG9wU3RvcmFnZShuYW1lKSB7XHJcblxyXG4gICAgLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICBsb2NhbFN0b3JhZ2VbbmFtZV0gPSAnJztcclxuXHJcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSkgIT09IG51bGwpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhg0YXRgNCw0L3QuNC70LjRidC1ICR7bmFtZX0g0YHRg9GJ0LXRgdGC0LLRg9C10YJgKTtcclxuICAgICAgICByZXR1cm4gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYNGH0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LosINGF0YDQsNC90LjQu9C40YnQtSAke25hbWV9INC90LXRgdGD0YnQtdGB0YLQstGD0LXRgmApO1xyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG5cclxufVxyXG4vKipcclxuICog0KTRg9C90LrRhtC40Y8g0YfRgtC10L3QuNGPIEpTT04g0YTQsNC50LvQvtCyXHJcbiAqIEBwYXJhbSBqc29uRmlsZVxyXG4gKiBAcGFyYW0gY2FsbGJhY2sg0KTRg9C90LrRhtC40Y8g0LIg0LrQvtGC0L7RgNGD0Y4g0LLQvtC30LLRgNCw0YnQsNC10Lwg0YDQtdC30YPQu9GM0YLQsNGCIFBBUlNFINC4INC90LDQt9Cy0LDQvdC40LVcclxuICog0LrQu9Cw0YHRgdCwINC+0LHQtdGA0YLQutC4INGC0L7QstCw0YDQsFxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIGdldEpzb24oanNvbkZpbGUsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ0dFVCcsICdqc29uLycgKyBqc29uRmlsZSwgdHJ1ZSk7XHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ9GB0YLQsNGC0YPRgSDQs9C+0YLQvtCy0L4nKTtcclxuICAgICAgICAgICAgLy8gY2FsbGJhY2soSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSwgd3JhcHBlckNsYXNzKTtcclxuICAgICAgICAgICAgY2FsbGJhY2soKHhoci5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn0YHRgtCw0YLRg9GBINCz0L7RgtC+0LLQvdC+0YHRgtC4ICcgKyB4aHIucmVhZHlTdGF0ZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfRgdGC0LDRgtGD0YEgJyArIHhoci5zdGF0dXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB4aHIuc2VuZCgpO1xyXG59XHJcbmxldCB3cmFwcGVyQ2xhc3MgPSAnZHJvcGRvd25DYXJ0JztcclxubGV0IGxvY2FsQ2FydFN0b3JhZ2VOYW1lID0gJ21pbmlDYXJ0JztcclxuXHJcbmxldCBtaW5pQ2FydCA9IHtcclxuXHJcbiAgICAvLyBpbml0KGRhdGEsIGxvY2FsQ2FydFN0b3JhZ2VOYW1lKSB7XHJcbiAgICAvLyAgICAgbG9jYWxTdG9yYWdlW2xvY2FsQ2FydFN0b3JhZ2VOYW1lXSA9IGRhdGE7XHJcbiAgICAvLyAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIC8vIH0sXHJcblxyXG4gICAgZW1weUNhcnQ6IHtcclxuICAgICAgICBhbW91bjogMCxcclxuICAgICAgICBjb3VudEdvb2RzOiAwLFxyXG4gICAgICAgIGNvbnRlbnRzOiBbXVxyXG4gICAgfSxcclxuXHJcbiAgICBpbml0KCkge1xyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0obG9jYWxDYXJ0U3RvcmFnZU5hbWUpID09PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkobWluaUNhcnQuZW1weUNhcnQpKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh3cmFwcGVyQ2xhc3MpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xpY2sgPT4gdGhpcy5jbGlja0hhbmRsZXIoZXZlbnQpKTtcclxuICAgICAgICAgICAgbWluaUNhcnQucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHdyYXBwZXJDbGFzcylbMF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbGljayA9PiB0aGlzLmNsaWNrSGFuZGxlcihldmVudCkpO1xyXG4gICAgICAgICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgY2xpY2tIYW5kbGVyKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gaWYgKGV2ZW50LnRhcmdldC5kYXRhc2V0LmJ1dHRvbl9uYW1lID09PSAnY2xlYXInKSB7XHJcbiAgICAgICAgLy8gICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGxvY2FsQ2FydFN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShtaW5pQ2FydC5lbXB5Q2FydCkpO1xyXG4gICAgICAgIC8vICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQudGFyZ2V0LmRhdGFzZXQuYnV0dG9uX25hbWUpIHtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2NsZWFyJzpcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkobWluaUNhcnQuZW1weUNhcnQpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZShldmVudCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBkZWxldGUoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgbGV0IGlkID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQuaWRfcHJvZHVjdDtcclxuICAgICAgICBsZXQgYXJyID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSkpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4PTA7IGluZGV4IDwgYXJyLmNvbnRlbnRzLmxlbmd0aDtpbmRleCsrKXtcclxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KGFyci5jb250ZW50c1tpbmRleF0uaWRfcHJvZHVjdCkgPT09IHBhcnNlSW50KGlkKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChhcnIuY29udGVudHNbaW5kZXhdLnF1YW50aXR5KT4xKXtcclxuICAgICAgICAgICAgICAgICAgICBhcnIuY29udGVudHNbaW5kZXhdLnF1YW50aXR5ID0gYXJyLmNvbnRlbnRzW2luZGV4XS5xdWFudGl0eSAtIDE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnIuY29udGVudHMuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShsb2NhbENhcnRTdG9yYWdlTmFtZSwgSlNPTi5zdHJpbmdpZnkoYXJyKSk7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXIoKSB7XHJcblxyXG4gICAgICAgIGxldCBhbW1vdW50ID0gMDtcclxuICAgICAgICBsZXQgcHJpY2UgPSAwO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUl0ZW1Db250YWluZXIgPSAnJztcclxuXHJcbiAgICAgICAgbGV0IGFyciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtaW5pQ2FydFwiKSkuY29udGVudHM7XHJcblxyXG4gICAgICAgIGxldCB0ZW1wRHJvcERvd25DYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZHJvcGRvd25DYXJ0JylbMF07XHJcbiAgICAgICAgdGVtcERyb3BEb3duQ2FydC5pbm5lckhUTUwgPSAnJztcclxuXHJcblxyXG5cclxuICAgICAgICBpZiAoYXJyLmxlbmd0aCAhPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyLmNsYXNzTmFtZSA9ICdkcm9wZG93bkNhcnRfX2l0ZW1XcmFwZXInO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRyb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkcm9wZG93bkNhcnRfX2J1dHRvbldyYXBwZXIuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duQ2FydF9fYnV0dG9uV3JhcHBlcic7XHJcblxyXG4gICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0LmFwcGVuZENoaWxkKHRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyKTtcclxuICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydC5hcHBlbmRDaGlsZChkcm9wZG93bkNhcnRfX2J1dHRvbldyYXBwZXIpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcERyb3BEb3duQ2FydEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtLmNsYXNzTmFtZSA9J2Ryb3Bkb3duQ2FydF9faXRlbSc7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0SXRlbS5pbm5lckhUTUwgPSBgPGltZyBjbGFzcz1cImRyb3Bkb3duQ2FydF9faW1nXCIgc3JjPVwiaW1nLyR7YXJyW2ldLmltZ31cIiBhbHQ9XCJcIj5gO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCB0ZW1wRHJvcERvd25JbmZvV3JhcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25JbmZvV3JhcGVyLmNsYXNzTmFtZSA9J2Ryb3Bkb3duQ2FydF9faW5mb1dyYXBwZXInO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBQcmljZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgICAgIHBQcmljZS5jbGFzc05hbWUgPSAnZHJvcGRvd25DYXJ0X19wcmljZSc7XHJcbiAgICAgICAgICAgICAgICBwUHJpY2UuaW5uZXJIVE1MID0gYCR7YXJyW2ldLnF1YW50aXR5fSB4ICR7YXJyW2ldLnByaWNlfSDRgNGD0LEuYDtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkluZm9XcmFwZXIuYXBwZW5kQ2hpbGQocFByaWNlKTtcclxuICAgICAgICAgICAgICAgIGxldCBwRGVzY3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICBwRGVzY3IuY2xhc3NOYW1lID0gJ2Ryb3Bkb3duQ2FydF9fZGVzY3JpcHRpb24nO1xyXG4gICAgICAgICAgICAgICAgcERlc2NyLmlubmVySFRNTCA9IGAke2FycltpXS5wcm9kdWN0X25hbWV9YDtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkluZm9XcmFwZXIuYXBwZW5kQ2hpbGQocERlc2NyKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0ZW1wRHJvcERvd25DYXJ0SXRlbS5hcHBlbmRDaGlsZCh0ZW1wRHJvcERvd25JbmZvV3JhcGVyKTtcclxuICAgICAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnRJdGVtV3JhcGVyLmFwcGVuZENoaWxkKHRlbXBEcm9wRG93bkNhcnRJdGVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgdGVtcEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgdGVtcEJ1dHRvbi5pbm5lckhUTUwgPSBgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBkcm9wZG93bkNhcnRfX2J1dHRvbkRlbFwiIGRhdGEtYnV0dG9uX25hbWU9XCJkZWxldGVcIiBkYXRhLWlkX3Byb2R1Y3Q9XCIke2FycltpXS5pZF9wcm9kdWN0fVwiPng8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICAgICAgdGVtcERyb3BEb3duQ2FydEl0ZW0uYXBwZW5kQ2hpbGQodGVtcEJ1dHRvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJpY2UgPSBwcmljZSArIGFycltpXS5xdWFudGl0eSAqIGFycltpXS5wcmljZTtcclxuICAgICAgICAgICAgICAgIGFtbW91bnQgPSBhbW1vdW50ICsgYXJyW2ldLnF1YW50aXR5O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uX21vZFwiIGRhdGEtYnV0dG9uX25hbWU9XCJjaGVja1wiPtCe0YTQvtGA0LzQuNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uIGRyb3Bkb3duQ2FydF9fYnV0dG9uX21vZFwiIGRhdGEtYnV0dG9uX25hbWU9XCJjYXJ0XCI+PGEgaHJlZj1cIi4uL2JpZ2NhcnQuaHRtbFwiPtCa0L7RgNC30LjQvdCwPC9hPjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gZHJvcGRvd25DYXJ0X19idXR0b24gZHJvcGRvd25DYXJ0X19idXR0b25fbW9kXCIgZGF0YS1idXR0b25fbmFtZT1cImNsZWFyXCI+0J7Rh9C40YHRgtC40YLRjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICBkcm9wZG93bkNhcnRfX2J1dHRvbldyYXBwZXIuaW5uZXJIVE1MID0gYnV0dG9uO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ21pbmlDYXJ0LnJlbmRlciDQstGL0LLQvtC00LjRgiDQv9GD0YHRgtGD0Y4g0YTQvtGA0LzRgyDQsdC10Lcg0YLQvtCy0LDRgNC+0LInKTtcclxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlSXRlbSA9IGBcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRyb3Bkb3duQ2FydF9fZW1wdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZHJvcGRvd25DYXJ0X19pbWdDYXJ0XCI+PGkgY2xhc3M9XCJmYSBmYS1zaG9wcGluZy1jYXJ0XCI+PC9pPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwPtCSINC60L7RgNC30LjQvdC1INC90LjRh9C10LPQviDQvdC10YI8L3A+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIHRlbXBEcm9wRG93bkNhcnQuaW5uZXJIVE1MPXRlbXBsYXRlSXRlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBidXR0b25DYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgaGVhZGVyTWlkZGxlX19teUNhcnRfbW9kYClbMF07XHJcbiAgICAgICAgbGV0IGJ1dHRvbkNhcnRUZW1wbGF0ZSA9IGA8c3BhbiBjbGFzcz1cInRleHRQaW5rXCI+JHthbW1vdW50fSZuYnNwXHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+0YLQvtCy0LDRgNC+0LIvJm5ic3A8c3BhbiBjbGFzcz1cInRleHRQaW5rXCI+JHtwcmljZX0mbmJzcDwvc3Bhbj7RgNGD0LFgO1xyXG4gICAgICAgIGJ1dHRvbkNhcnQuaW5uZXJIVE1MID0gYnV0dG9uQ2FydFRlbXBsYXRlO1xyXG5cclxuICAgIH1cclxufTtcclxubGV0IGxvYWRDYXRhbG9nRGF0YSA9IHtcclxuXHJcbiAgICBzZXR0aW5nczoge1xyXG4gICAgICAgIGRhdGE6ICcnLFxyXG4gICAgICAgIGxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lOiAnY2F0YWxvZ0RhdGEnLFxyXG4gICAgICAgIGxvY2FsQ2FydFN0b3JhZ2VOYW1lOiAnZ2V0QmFza2V0JyxcclxuICAgIH0sXHJcblxyXG4gICAgaW5pdChzZXR0aW5ncykge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKCh0aGlzLnNldHRpbmdzLCBzZXR0aW5ncykpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUsIHRoaXMuc2V0dGluZ3MuZGF0YSk7XHJcbiAgICAgICAgbGV0IGRhdGFQYXJzZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW3RoaXMuc2V0dGluZ3MubG9jYWxDYXRhbG9nU3RvcmFnZU5hbWVdKTtcclxuICAgICAgICB0aGlzLnJlbmRlcih0aGlzLnNldHRpbmdzLmxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lKTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5X19pdGVtV3JhcHBlcicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5jbGlja0hhbmRsZXIoZXZlbnQpKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqINCe0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC/0L4g0LrQvdC+0L/QutC1XHJcbiAgICAgKiBAcGFyYW0gZXZlbnRcclxuICAgICAqL1xyXG4gICAgY2xpY2tIYW5kbGVyKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQudGFnTmFtZSAhPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCBhIGJ1dHRvbicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZENhcnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuaWRfcHJvZHVjdCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZENhcnQoaWRfcHJvZHVjdCkge1xyXG5cclxuICAgICAgICBsZXQgY2hlY2tDb250YWluID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGRhdGFDYXJ0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnNldHRpbmdzLmxvY2FsQ2FydFN0b3JhZ2VOYW1lKSk7XHJcbiAgICAgICAgaWYgKGRhdGFDYXJ0LmNvbnRlbnRzLmxlbmd0aCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YUNhcnQuY29udGVudHMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoaWRfcHJvZHVjdCkgPT0gcGFyc2VJbnQoZGF0YUNhcnQuY29udGVudHNbaW5kZXhdLmlkX3Byb2R1Y3QpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUNhcnQuY29udGVudHNbaW5kZXhdLnF1YW50aXR5ID0gZGF0YUNhcnQuY29udGVudHNbaW5kZXhdLnF1YW50aXR5ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnNldHRpbmdzLmxvY2FsQ2FydFN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShkYXRhQ2FydCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbmlDYXJ0LnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrQ29udGFpbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hlY2tDb250YWluID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBpZiAoIWNoZWNrQ29udGFpbikge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFJdGVtRnJvbUNhdGFsb2cgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUpKVtwYXJzZUludChpZF9wcm9kdWN0IC0gMSldO1xyXG4gICAgICAgICAgICBsZXQgYXJyTGVndGggPSBkYXRhQ2FydC5jb250ZW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBhcnJJdGVtID0ge307XHJcbiAgICAgICAgICAgIGFyckl0ZW0uaWRfcHJvZHVjdCA9IHBhcnNlSW50KGlkX3Byb2R1Y3QpO1xyXG4gICAgICAgICAgICBhcnJJdGVtLmltZyA9IGRhdGFJdGVtRnJvbUNhdGFsb2cuaW1nO1xyXG4gICAgICAgICAgICBhcnJJdGVtLnByb2R1Y3RfbmFtZSA9IGRhdGFJdGVtRnJvbUNhdGFsb2cucHJvZHVjdF9uYW1lO1xyXG4gICAgICAgICAgICBhcnJJdGVtLnByaWNlID0gZGF0YUl0ZW1Gcm9tQ2F0YWxvZy5wcmljZTtcclxuICAgICAgICAgICAgYXJySXRlbS5xdWFudGl0eSA9IHBhcnNlSW50KDEpO1xyXG4gICAgICAgICAgICBkYXRhQ2FydC5jb250ZW50cy5wdXNoKGFyckl0ZW0pO1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLnNldHRpbmdzLmxvY2FsQ2FydFN0b3JhZ2VOYW1lLCBKU09OLnN0cmluZ2lmeShkYXRhQ2FydCkpO1xyXG4gICAgICAgICAgICBtaW5pQ2FydC5yZW5kZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcihsb2NhbENhdGFsb2dTdG9yYWdlTmFtZSkge1xyXG4gICAgICAgIGxldCBkYXRhUGFyc2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZVtsb2NhbENhdGFsb2dTdG9yYWdlTmFtZV0pO1xyXG4gICAgICAgIGxldCBnYWxsYXJ5V3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2dhbGxlcnlfX2l0ZW1XcmFwcGVyJylbMF07XHJcbiAgICAgICAgbGV0IGdhbGxhcnlJdGVtQ29udGFpbmVyID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBkYXRhUGFyc2UubGVuZ3RoIC0gMTsgaW5kZXggPiBkYXRhUGFyc2UubGVuZ3RoIC0gNjsgaW5kZXgtLSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IGdhbGxlcnlUZW1wbGF0ZSA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnlfX2l0ZW1cIj5cclxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYWxsZXJ5X19jb250YWluZXJJdGVtSW1nXCI+PGltZyBjbGFzcz1cImdhbGxlcnlfX2l0ZW1JbWdcIiBzcmM9XCJpbWcvJHtkYXRhUGFyc2VbaW5kZXhdLmltZ31cImFsdD1cIlwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHAgY2xhc3M9XCJnYWxsZXJ5X19pdGVtVGl0bGVcIj4ke2RhdGFQYXJzZVtpbmRleF0ucHJvZHVjdF9uYW1lfTwvcD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxwIGNsYXNzPVwiZ2FsbGVyeV9fYXRpbmdzXCI+KioqKio8L3A+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj48cCBjbGFzcz1cImdhbGxlcnlfX3ByaWNlXCI+JHtkYXRhUGFyc2VbaW5kZXhdLnByaWNlfSAke2RhdGFQYXJzZVtpbmRleF0uY3VycmVuY3l9PC9wPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24gZ2FsbGVyeV9faXRlbUJ1dHRvblwiIGRhdGEtaWRfcHJvZHVjdD1cIiR7ZGF0YVBhcnNlW2luZGV4XS5pZF9wcm9kdWN0fVwiPtCU0L7QsdCw0LLQuNGC0Yw8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgZ2FsbGFyeUl0ZW1Db250YWluZXIgPSBnYWxsYXJ5SXRlbUNvbnRhaW5lciArIGdhbGxlcnlUZW1wbGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2FsbGFyeVdyYXBwZXIuaW5uZXJIVE1MID0gZ2FsbGFyeUl0ZW1Db250YWluZXI7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgbWluaUNhcnQuaW5pdCgpO1xyXG5cclxuXHJcblxyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqINCf0L7QtNC70Y7Rh9C10L3QuNC1INGB0LLQvtC40YUg0YTQsNC50LvQvtCyIEpTINC00LvRjyDRgdCx0L7RgNC60LhcclxuICogLy89IHBhcnRzL2FwcC5qc1xyXG4gKiAvLz0gcGFydHMvaGVhZGVyLmpzXHJcbiAqIC8vPSBwYXJ0cy9mb290ZXIuanNcclxuICovIl19
