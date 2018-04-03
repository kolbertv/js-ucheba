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

    consoleRender(data) {
        console.log(data);
        let customerLegend = document.getElementById('customer_legend');
        customerLegend.innerText = customerLegend.innerText + ' IP: ' + data.ip;
        let customerRegion = document.getElementById('region');
        customerRegion.value = data.region.name_ru;
        let customerCity = document.getElementById('city');
        customerCity.value = data.city.name_ru;
            }
};


window.onload = function () {
    getIp.get();

};