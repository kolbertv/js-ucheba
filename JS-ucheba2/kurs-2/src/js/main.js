"use strict";

/*
 * Сборка фалов JS сторонних
 * //= ../../bower_components/jquery/dist/jquery.js
 */


window.onload = function () {

    let localCartStorageName = 'miniCart';
    let localCatalogStorageName = 'catalogData';

    // localStorage.clear();

    // getJson('getBasket.json', data => miniCart.init(data,localCartStorageName));

    miniCart.init();


    getJson('catalogData.json', data => loadCatalogData.init({
        data,
        localCatalogStorageName,
        localCartStorageName
    }));


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


