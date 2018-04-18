"use strict";

/*
 * Сборка фалов JS сторонних
 * //= ../../bower_components/jquery/dist/jquery.js
 */


window.onload = function () {

    let localCartStorageName = 'miniCart';
    let localCatalogStorageName = 'catalogData';

    if (localShopStorage(localCartStorageName)) {

        getJson('getBasket.json', data => miniCart.init(data, 'dropdownCart', localCartStorageName));

        if (localShopStorage(localCatalogStorageName)) {
            getJson('catalogData.json', data => loadCatalogData.init({
                data,
                localCatalogStorageName,
                localCartStorageName
            }));
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

//= parts/local_storage.js
//= parts/get_json.js
//= parts/dropdowncart.js
//= parts/catalog.js


