"use strict";

let getIp = {


    getAjax(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.sypexgeo.net', true);
        xhr.onreadystatechange = function () {

            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('статус: готово');
                callback(JSON.parse(xhr.responseText));
            } else {
                console.log('статус готовности ' + xhr.readyState);
                console.log('статус ' + xhr.status);
            }
        };
        xhr.send();
    },

    get() {

       return this.getAjax(this.consoleRender)
    },

    consoleRender (data) {
       console.log(data.city.name_ru);
       console.log(data.region.name_ru);

    }
};




window.onload = function () {
    getIp.get();

};