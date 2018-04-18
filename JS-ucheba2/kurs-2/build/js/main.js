"use strict";

/*
 * Сборка фалов JS сторонних
 * //= ../../bower_components/jquery/dist/jquery.js
 */

window.onload = function () {

    var localCartStorageName = 'miniCart';
    var localCatalogStorageName = 'catalogData';

    if (localShopStorage(localCartStorageName)) {

        getJson('getBasket.json', function (data) {
            return miniCart.init(data, 'dropdownCart', localCartStorageName);
        });

        if (localShopStorage(localCatalogStorageName)) {
            getJson('catalogData.json', function (data) {
                return loadCatalogData.init({
                    data: data,
                    localCatalogStorageName: localCatalogStorageName,
                    localCartStorageName: localCartStorageName
                });
            });
        } else {

            console.log('ничего не работает');
        }
    }
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
var miniCart = {
    init: function init(data, wrapperClass, localCartStorageName) {

        localStorage[localCartStorageName] = data;

        // localStorage.clear();

        // let dataParse =JSON.parse(localStorage.getItem("miniCart"));
        // console.log(dataParse);

        // console.log(localStorage.getItem("miniCart") !== null);
        // let dataParse = localStorage["miniCart"];

        this.render(wrapperClass);
    },
    render: function render(wrapperClass) {

        var ammount = 0;
        var price = 0;
        var templateItemContainer = '';

        if (localStorage.getItem("miniCart") !== null) {

            var arr = JSON.parse(localStorage.getItem("miniCart")).contents;
            console.log(arr);
            for (var i = 0; i < arr.length; i++) {
                var templateItem = '\n             <div class="' + wrapperClass + '__item">\n               <img class="' + wrapperClass + '__img" src="img/' + arr[i].img + '" alt="">\n               <div class="' + wrapperClass + '__infoWrapper">\n                 <p class="' + wrapperClass + '__price">' + arr[i].quantity + ' x ' + arr[i].price + ' \u0440\u0443\u0431. </p>\n                 <p class="' + wrapperClass + '__description">' + arr[i].product_name + '</p>\n               </div>\n               <div class="' + wrapperClass + '__buttonWrapper">\n                 <button class="button ' + wrapperClass + '__buttonDel" data-idproduct="' + arr[i].id_product + '">x</button>\n               </div>\n             </div>';
                templateItemContainer = templateItemContainer + templateItem;
                price = price + arr[i].quantity * arr[i].price;
                ammount = ammount + arr[i].quantity;
            }
        } else {

            var _templateItem = '\n                <div class="' + wrapperClass + '__item">\n                  <div class="' + wrapperClass + '__empty">\n                      <p><i class="fas fa-shopping-cart"></i></p>\n                      <p>\u0412 \u043A\u043E\u0440\u0437\u0438\u043D\u0435 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442</p>\n                   </div>\n                </div>\n            ';
            templateItemContainer = _templateItem;
        }

        var buttonCart = document.getElementsByClassName('headerMiddle__myCart_mod')[0];
        var buttonCartTemplate = '<span class="textPink">' + ammount + '&nbsp\n                </span>\u0442\u043E\u0432\u0430\u0440\u043E\u0432/&nbsp<span class="textPink">' + price + '&nbsp</span>\u0440\u0443\u0431';
        buttonCart.innerHTML = buttonCartTemplate;

        var a = document.getElementsByClassName(wrapperClass + '__wraper')[0];
        a.innerHTML = templateItemContainer;
    }
};
var loadCatalogData = {

    settings: {
        data: '',
        localCatalogStorageName: 'catalogData',
        localCartStorageName: 'getBasket'
    },

    init: function init(settings) {
        var _this = this;

        this.settings = Object.assign((this.settings, settings));

        localStorage.setItem(this.settings.localCatalogStorageName, this.settings.data);
        var dataParse = JSON.parse(localStorage[this.settings.localCatalogStorageName]);
        // console.log(dataParse);

        this.render(this.settings.localCatalogStorageName);

        document.getElementsByClassName('gallery__itemWrapper')[0].addEventListener('click', function (event) {
            return _this.clickHandler(event);
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

        var data = JSON.parse(localStorage.getItem(this.settings.localCartStorageName));
        for (var index = 0; index < data.contents.length; index++) {
            if (parseInt(id_product) == parseInt(data.contents[index].id_product)) {
                data.contents[index].quantity = data.contents[index].quantity + 1;
                localStorage.setItem(this.settings.localCartStorageName, JSON.stringify(data));
                miniCart.render('dropdownCart');
            } else {}
        }
    },
    render: function render(localCatalogStorageName) {
        var dataParse = JSON.parse(localStorage[localCatalogStorageName]);
        var gallaryWrapper = document.getElementsByClassName('gallery__itemWrapper')[0];
        var gallaryItemContainer = '';
        for (var index = dataParse.length - 1; index > dataParse.length - 6; index--) {

            var galleryTemplate = '\n            <div class="gallery__item">\n             <div class="gallery__containerItemImg"><img class="gallery__itemImg" src="img/' + dataParse[index].imgName + '"alt=""></div>\n                    <div><p class="gallery__itemTitle">' + dataParse[index].product_name + '</p></div>\n                    <div><p class="gallery__atings">*****</p></div>\n                    <div><p class="gallery__price">' + dataParse[index].price + '</p></div>\n                    <div>\n                        <button class="button gallery__itemButton" data-id_product="' + dataParse[index].id_product + '">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n                    </div>\n            </div>';
            gallaryItemContainer = gallaryItemContainer + galleryTemplate;
        }
        gallaryWrapper.innerHTML = gallaryItemContainer;
    }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwibG9jYWxDYXJ0U3RvcmFnZU5hbWUiLCJsb2NhbENhdGFsb2dTdG9yYWdlTmFtZSIsImxvY2FsU2hvcFN0b3JhZ2UiLCJnZXRKc29uIiwibWluaUNhcnQiLCJpbml0IiwiZGF0YSIsImxvYWRDYXRhbG9nRGF0YSIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImpzb25GaWxlIiwiY2FsbGJhY2siLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2VUZXh0Iiwic2VuZCIsIndyYXBwZXJDbGFzcyIsInJlbmRlciIsImFtbW91bnQiLCJwcmljZSIsInRlbXBsYXRlSXRlbUNvbnRhaW5lciIsImFyciIsIkpTT04iLCJwYXJzZSIsImNvbnRlbnRzIiwiaSIsImxlbmd0aCIsInRlbXBsYXRlSXRlbSIsImltZyIsInF1YW50aXR5IiwicHJvZHVjdF9uYW1lIiwiaWRfcHJvZHVjdCIsImJ1dHRvbkNhcnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJidXR0b25DYXJ0VGVtcGxhdGUiLCJpbm5lckhUTUwiLCJhIiwic2V0dGluZ3MiLCJPYmplY3QiLCJhc3NpZ24iLCJzZXRJdGVtIiwiZGF0YVBhcnNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsaWNrSGFuZGxlciIsImV2ZW50IiwidGFyZ2V0IiwidGFnTmFtZSIsImFkZENhcnQiLCJkYXRhc2V0IiwiaW5kZXgiLCJwYXJzZUludCIsInN0cmluZ2lmeSIsImdhbGxhcnlXcmFwcGVyIiwiZ2FsbGFyeUl0ZW1Db250YWluZXIiLCJnYWxsZXJ5VGVtcGxhdGUiLCJpbWdOYW1lIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7QUFNQUEsT0FBT0MsTUFBUCxHQUFnQixZQUFZOztBQUV4QixR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ekRXLEVBeURjO0FBQzVCLFlBQUlnRCxZQUFZcEIsS0FBS0MsS0FBTCxDQUFXbkIsYUFBYVYsdUJBQWIsQ0FBWCxDQUFoQjtBQUNBLFlBQUkyRCxpQkFBaUJwQixTQUFTQyxzQkFBVCxDQUFnQyxzQkFBaEMsRUFBd0QsQ0FBeEQsQ0FBckI7QUFDQSxZQUFJb0IsdUJBQXVCLEVBQTNCO0FBQ0EsYUFBSyxJQUFJSixRQUFRUixVQUFVaEIsTUFBVixHQUFtQixDQUFwQyxFQUF1Q3dCLFFBQVFSLFVBQVVoQixNQUFWLEdBQW1CLENBQWxFLEVBQXFFd0IsT0FBckUsRUFBOEU7O0FBRTFFLGdCQUFJSyw2SkFFNkViLFVBQVVRLEtBQVYsRUFBaUJNLE9BRjlGLCtFQUd5Q2QsVUFBVVEsS0FBVixFQUFpQnBCLFlBSDFELDRJQUtxQ1ksVUFBVVEsS0FBVixFQUFpQi9CLEtBTHRELG1JQU9zRXVCLFVBQVVRLEtBQVYsRUFBaUJuQixVQVB2RixnSEFBSjtBQVVBdUIsbUNBQXVCQSx1QkFBdUJDLGVBQTlDO0FBQ0g7QUFDREYsdUJBQWVqQixTQUFmLEdBQTJCa0Isb0JBQTNCO0FBQ0g7QUE1RWlCLENBQXRCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qXHJcbiAqINCh0LHQvtGA0LrQsCDRhNCw0LvQvtCyIEpTINGB0YLQvtGA0L7QvdC90LjRhVxyXG4gKiAvLz0gLi4vLi4vYm93ZXJfY29tcG9uZW50cy9qcXVlcnkvZGlzdC9qcXVlcnkuanNcclxuICovXHJcblxyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBsZXQgbG9jYWxDYXJ0U3RvcmFnZU5hbWUgPSAnbWluaUNhcnQnO1xyXG4gICAgbGV0IGxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lID0gJ2NhdGFsb2dEYXRhJztcclxuXHJcbiAgICBpZiAobG9jYWxTaG9wU3RvcmFnZShsb2NhbENhcnRTdG9yYWdlTmFtZSkpIHtcclxuXHJcbiAgICAgICAgZ2V0SnNvbignZ2V0QmFza2V0Lmpzb24nLCBkYXRhID0+IG1pbmlDYXJ0LmluaXQoZGF0YSwgJ2Ryb3Bkb3duQ2FydCcsIGxvY2FsQ2FydFN0b3JhZ2VOYW1lKSk7XHJcblxyXG4gICAgICAgIGlmIChsb2NhbFNob3BTdG9yYWdlKGxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lKSkge1xyXG4gICAgICAgICAgICBnZXRKc29uKCdjYXRhbG9nRGF0YS5qc29uJywgZGF0YSA9PiBsb2FkQ2F0YWxvZ0RhdGEuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgbG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUsXHJcbiAgICAgICAgICAgICAgICBsb2NhbENhcnRTdG9yYWdlTmFtZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQvdC40YfQtdCz0L4g0L3QtSDRgNCw0LHQvtGC0LDQtdGCJyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiDQn9C+0LTQu9GO0YfQtdC90LjQtSDRgdCy0L7QuNGFINGE0LDQudC70L7QsiBKUyDQtNC70Y8g0YHQsdC+0YDQutC4XHJcbiAqIC8vPSBwYXJ0cy9hcHAuanNcclxuICogLy89IHBhcnRzL2hlYWRlci5qc1xyXG4gKiAvLz0gcGFydHMvZm9vdGVyLmpzXHJcbiAqL1xyXG5cclxuXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5mdW5jdGlvbiBsb2NhbFNob3BTdG9yYWdlKG5hbWUpIHtcclxuXHJcbiAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuICAgIGxvY2FsU3RvcmFnZVtuYW1lXSA9ICcnO1xyXG5cclxuICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKSAhPT0gbnVsbCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGDRhdGA0LDQvdC40LvQuNGJ0LUgJHtuYW1lfSDRgdGD0YnQtdGB0YLQstGD0LXRgmApO1xyXG4gICAgICAgIHJldHVybiAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhg0YfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQuiwg0YXRgNCw0L3QuNC70LjRidC1ICR7bmFtZX0g0L3QtdGB0YPRidC10YHRgtCy0YPQtdGCYCk7XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcblxyXG59XHJcbi8qKlxyXG4gKiDQpNGD0L3QutGG0LjRjyDRh9GC0LXQvdC40Y8gSlNPTiDRhNCw0LnQu9C+0LJcclxuICogQHBhcmFtIGpzb25GaWxlXHJcbiAqIEBwYXJhbSBjYWxsYmFjayDQpNGD0L3QutGG0LjRjyDQsiDQutC+0YLQvtGA0YPRjiDQstC+0LfQstGA0LDRidCw0LXQvCDRgNC10LfRg9C70YzRgtCw0YIgUEFSU0Ug0Lgg0L3QsNC30LLQsNC90LjQtVxyXG4gKiDQutC70LDRgdGB0LAg0L7QsdC10YDRgtC60Lgg0YLQvtCy0LDRgNCwXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZ2V0SnNvbihqc29uRmlsZSwgY2FsbGJhY2spIHtcclxuXHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignR0VUJywgJ2pzb24vJyArIGpzb25GaWxlLCB0cnVlKTtcclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0ICYmIHhoci5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygn0YHRgtCw0YLRg9GBINCz0L7RgtC+0LLQvicpO1xyXG4gICAgICAgICAgICAvLyBjYWxsYmFjayhKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpLCB3cmFwcGVyQ2xhc3MpO1xyXG4gICAgICAgICAgICBjYWxsYmFjaygoeGhyLnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfRgdGC0LDRgtGD0YEg0LPQvtGC0L7QstC90L7RgdGC0LggJyArIHhoci5yZWFkeVN0YXRlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ9GB0YLQsNGC0YPRgSAnICsgeGhyLnN0YXR1cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn1cclxubGV0IG1pbmlDYXJ0ID0ge1xyXG5cclxuICAgIGluaXQoZGF0YSwgd3JhcHBlckNsYXNzLCBsb2NhbENhcnRTdG9yYWdlTmFtZSkge1xyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2VbbG9jYWxDYXJ0U3RvcmFnZU5hbWVdID0gZGF0YTtcclxuXHJcbiAgICAgICAgLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcblxyXG4gICAgICAgIC8vIGxldCBkYXRhUGFyc2UgPUpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtaW5pQ2FydFwiKSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YVBhcnNlKTtcclxuXHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJtaW5pQ2FydFwiKSAhPT0gbnVsbCk7XHJcbiAgICAgICAgLy8gbGV0IGRhdGFQYXJzZSA9IGxvY2FsU3RvcmFnZVtcIm1pbmlDYXJ0XCJdO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlcih3cmFwcGVyQ2xhc3MpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXIod3JhcHBlckNsYXNzKSB7XHJcblxyXG4gICAgICAgIGxldCBhbW1vdW50ID0gMDtcclxuICAgICAgICBsZXQgcHJpY2UgPSAwO1xyXG4gICAgICAgIGxldCB0ZW1wbGF0ZUl0ZW1Db250YWluZXIgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibWluaUNhcnRcIikgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibWluaUNhcnRcIikpLmNvbnRlbnRzO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnIpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXBsYXRlSXRlbSA9IGBcclxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3dyYXBwZXJDbGFzc31fX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cIiR7d3JhcHBlckNsYXNzfV9faW1nXCIgc3JjPVwiaW1nLyR7YXJyW2ldLmltZ31cIiBhbHQ9XCJcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7d3JhcHBlckNsYXNzfV9faW5mb1dyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cIiR7d3JhcHBlckNsYXNzfV9fcHJpY2VcIj4ke2FycltpXS5xdWFudGl0eX0geCAke2FycltpXS5wcmljZX0g0YDRg9CxLiA8L3A+XHJcbiAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCIke3dyYXBwZXJDbGFzc31fX2Rlc2NyaXB0aW9uXCI+JHthcnJbaV0ucHJvZHVjdF9uYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3dyYXBwZXJDbGFzc31fX2J1dHRvbldyYXBwZXJcIj5cclxuICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uICR7d3JhcHBlckNsYXNzfV9fYnV0dG9uRGVsXCIgZGF0YS1pZHByb2R1Y3Q9XCIke2FycltpXS5pZF9wcm9kdWN0fVwiPng8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVJdGVtQ29udGFpbmVyID0gdGVtcGxhdGVJdGVtQ29udGFpbmVyICsgdGVtcGxhdGVJdGVtO1xyXG4gICAgICAgICAgICAgICAgcHJpY2UgPSBwcmljZSArIGFycltpXS5xdWFudGl0eSAqIGFycltpXS5wcmljZTtcclxuICAgICAgICAgICAgICAgIGFtbW91bnQgPSBhbW1vdW50ICsgYXJyW2ldLnF1YW50aXR5O1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IHRlbXBsYXRlSXRlbSA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke3dyYXBwZXJDbGFzc31fX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7d3JhcHBlckNsYXNzfV9fZW1wdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwPjxpIGNsYXNzPVwiZmFzIGZhLXNob3BwaW5nLWNhcnRcIj48L2k+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHA+0JIg0LrQvtGA0LfQuNC90LUg0L3QuNGH0LXQs9C+INC90LXRgjwvcD5cclxuICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlSXRlbUNvbnRhaW5lciA9IHRlbXBsYXRlSXRlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBidXR0b25DYXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgaGVhZGVyTWlkZGxlX19teUNhcnRfbW9kYClbMF07XHJcbiAgICAgICAgbGV0IGJ1dHRvbkNhcnRUZW1wbGF0ZSA9IGA8c3BhbiBjbGFzcz1cInRleHRQaW5rXCI+JHthbW1vdW50fSZuYnNwXHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+0YLQvtCy0LDRgNC+0LIvJm5ic3A8c3BhbiBjbGFzcz1cInRleHRQaW5rXCI+JHtwcmljZX0mbmJzcDwvc3Bhbj7RgNGD0LFgO1xyXG4gICAgICAgIGJ1dHRvbkNhcnQuaW5uZXJIVE1MID0gYnV0dG9uQ2FydFRlbXBsYXRlO1xyXG5cclxuICAgICAgICBsZXQgYSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7d3JhcHBlckNsYXNzfV9fd3JhcGVyYClbMF07XHJcbiAgICAgICAgYS5pbm5lckhUTUwgPSB0ZW1wbGF0ZUl0ZW1Db250YWluZXI7XHJcblxyXG4gICAgfVxyXG59O1xyXG5sZXQgbG9hZENhdGFsb2dEYXRhID0ge1xyXG5cclxuICAgIHNldHRpbmdzOiB7XHJcbiAgICAgICAgZGF0YTogJycsXHJcbiAgICAgICAgbG9jYWxDYXRhbG9nU3RvcmFnZU5hbWU6ICdjYXRhbG9nRGF0YScsXHJcbiAgICAgICAgbG9jYWxDYXJ0U3RvcmFnZU5hbWU6ICdnZXRCYXNrZXQnLFxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW5pdChzZXR0aW5ncykge1xyXG5cclxuICAgICAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbigodGhpcy5zZXR0aW5ncywgc2V0dGluZ3MpKTtcclxuXHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZSwgdGhpcy5zZXR0aW5ncy5kYXRhKTtcclxuICAgICAgICBsZXQgZGF0YVBhcnNlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2VbdGhpcy5zZXR0aW5ncy5sb2NhbENhdGFsb2dTdG9yYWdlTmFtZV0pO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFQYXJzZSk7XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyKHRoaXMuc2V0dGluZ3MubG9jYWxDYXRhbG9nU3RvcmFnZU5hbWUpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnYWxsZXJ5X19pdGVtV3JhcHBlcicpWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5jbGlja0hhbmRsZXIoZXZlbnQpKVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDQntCx0YDQsNCx0L7RgtC60LAg0LrQu9C40LrQsCDQv9C+INC60L3QvtC/0LrQtVxyXG4gICAgICogQHBhcmFtIGV2ZW50XHJcbiAgICAgKi9cclxuICAgIGNsaWNrSGFuZGxlcihldmVudCkge1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnRhZ05hbWUgIT09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgYSBidXR0b24nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRDYXJ0KGV2ZW50LnRhcmdldC5kYXRhc2V0LmlkX3Byb2R1Y3QpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhZGRDYXJ0KGlkX3Byb2R1Y3QpIHtcclxuXHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXJ0U3RvcmFnZU5hbWUpKTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZGF0YS5jb250ZW50cy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KGlkX3Byb2R1Y3QpID09IHBhcnNlSW50KGRhdGEuY29udGVudHNbaW5kZXhdLmlkX3Byb2R1Y3QpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLmNvbnRlbnRzW2luZGV4XS5xdWFudGl0eSA9IGRhdGEuY29udGVudHNbaW5kZXhdLnF1YW50aXR5ICsgMTtcclxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuc2V0dGluZ3MubG9jYWxDYXJ0U3RvcmFnZU5hbWUsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcclxuICAgICAgICAgICAgICAgIG1pbmlDYXJ0LnJlbmRlcignZHJvcGRvd25DYXJ0Jyk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgcmVuZGVyKGxvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lKSB7XHJcbiAgICAgICAgbGV0IGRhdGFQYXJzZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlW2xvY2FsQ2F0YWxvZ1N0b3JhZ2VOYW1lXSk7XHJcbiAgICAgICAgbGV0IGdhbGxhcnlXcmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZ2FsbGVyeV9faXRlbVdyYXBwZXInKVswXTtcclxuICAgICAgICBsZXQgZ2FsbGFyeUl0ZW1Db250YWluZXIgPSAnJztcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IGRhdGFQYXJzZS5sZW5ndGggLSAxOyBpbmRleCA+IGRhdGFQYXJzZS5sZW5ndGggLSA2OyBpbmRleC0tKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgZ2FsbGVyeVRlbXBsYXRlID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2FsbGVyeV9faXRlbVwiPlxyXG4gICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbGxlcnlfX2NvbnRhaW5lckl0ZW1JbWdcIj48aW1nIGNsYXNzPVwiZ2FsbGVyeV9faXRlbUltZ1wiIHNyYz1cImltZy8ke2RhdGFQYXJzZVtpbmRleF0uaW1nTmFtZX1cImFsdD1cIlwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+PHAgY2xhc3M9XCJnYWxsZXJ5X19pdGVtVGl0bGVcIj4ke2RhdGFQYXJzZVtpbmRleF0ucHJvZHVjdF9uYW1lfTwvcD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjxwIGNsYXNzPVwiZ2FsbGVyeV9fYXRpbmdzXCI+KioqKio8L3A+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdj48cCBjbGFzcz1cImdhbGxlcnlfX3ByaWNlXCI+JHtkYXRhUGFyc2VbaW5kZXhdLnByaWNlfTwvcD48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGdhbGxlcnlfX2l0ZW1CdXR0b25cIiBkYXRhLWlkX3Byb2R1Y3Q9XCIke2RhdGFQYXJzZVtpbmRleF0uaWRfcHJvZHVjdH1cIj7QlNC+0LHQsNCy0LjRgtGMPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgIGdhbGxhcnlJdGVtQ29udGFpbmVyID0gZ2FsbGFyeUl0ZW1Db250YWluZXIgKyBnYWxsZXJ5VGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdhbGxhcnlXcmFwcGVyLmlubmVySFRNTCA9IGdhbGxhcnlJdGVtQ29udGFpbmVyO1xyXG4gICAgfVxyXG5cclxufTsiXX0=
