"use strict";


/**
 * Функция чтения JSON файлов
 * @param jsonFile
 * @param callback Функция в которую возвращаем результат PARSE и название
 * класса обертки товара
 * @param wrapperClass название класса единицы товара
 */

function getJson(jsonFile, callback, wrapperClass) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/' + jsonFile, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('статус готово');
            callback(JSON.parse(xhr.responseText), wrapperClass);
        } else {
            console.log('статус готовности ' + xhr.readyState);
            console.log('статус ' + xhr.status);
        }
    };
    xhr.send();
}

function consoleLog(data) {

    console.log(data);

}




window.onload = function () {

    console.log('страница загружена');

    getJson('getBasket.json', mini_cart.render, 'dropdownCart__')


};


