/**
 * Функция чтения JSON файлов
 * @param jsonFile
 * @param callback Функция в которую возвращаем результат PARSE и название
 * класса обертки товара
 */

function getJson(jsonFile, callback) {

    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/' + jsonFile, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log('статус готово');
            // callback(JSON.parse(xhr.responseText), wrapperClass);
            callback((xhr.responseText));
        } else {
            // console.log('статус готовности ' + xhr.readyState);
            // console.log('статус ' + xhr.status);
        }
    };
    xhr.send();
}

function getJsonFetch(jsonFile, callback) {

   fetch('json/' + jsonFile)
       .then(response => response.text())
       .then(text => {
           console.log(text)
       }).catch(error => {
           console.log(error)
   })
}

getJsonFetch('../json/' + 'getBasket.json');
getJson('../json/' + 'getBasket.json', consoleL);

function consoleL(err) {
    console.log(err)
}