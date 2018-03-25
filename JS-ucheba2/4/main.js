"use strict";

let text = {
    settings: {
        url: '',
    },

    getAjax(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            } else {
                console.log('стус готовности ' + xhr.readyState);
                console.log('статус ' + xhr.status);
            }
        };
        xhr.send();
        console.log('грузится с сервака');
    },


    /**
     * в this.getAjax добавить функцию которая будет вызываться при выполнении AJAX
     * @param settings
     */
    render(settings) {
        this.settings = Object.assign(this.settings, settings);
        this.getAjax(this.settings.url, this.consoleRender);
    },

    consoleRender(data) {

        console.log(data);
    },


};

let consoleRender = {

    render(data) {
        console.log(data);
    },
};


window.onload = function () {

    text.render({
        url: 'json/man.json',
    });

};
