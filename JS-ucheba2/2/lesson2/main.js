"use strict";

let menu = {

    /**
     * хранение основных параметров задаваемых при вызове menu
     */
    settings: {
        menuClass: '',
        jsonFile: '',
        dropMenuClass: '',
    },

    /**
     * Задание основных параметров и переъват событий от мышки
     * @param settings
     */
    render(settings) {
        this.settings = Object.assign(this.settings, settings);
        let menuContainer = document.getElementsByClassName(this.settings.menuClass)[0];
        menuContainer.innerHTML = this.menuCreate(this.settings.jsonFile);
        menuContainer.addEventListener('mouseover', event => this.mouseOverHandler(event));
        menuContainer.addEventListener('mouseout', event => this.mouseOutHandler(event));
        let dropMenuContainer = document.getElementsByClassName(this.settings.dropMenuClass)[0];
        dropMenuContainer.addEventListener('mouseenter', event => this.mouseOverHandler(event));
        dropMenuContainer.addEventListener('mouseleave', event => this.mouseOutHandler(event));
    },

    /**
     * обработка событик мышки при наведении на элементы меню и показ сабменю
     * @param event
     */
    mouseOverHandler(event) {
        if ((event.target.tagName !== 'A') && (event.target.className !== this.settings.dropMenuClass)) {
            return;
        }
        if (parseInt(event.target.dataset.dropmenu)) {
            let dropDownMenuItem = document.getElementsByClassName(this.settings.dropMenuClass)[0];
            let elem = event.target.getBoundingClientRect();
            if (event.target.tagName === 'A') {
                dropDownMenuItem.style.left = parseInt(elem.left) - 30 + 'px';
                dropDownMenuItem.innerHTML = this.dropDownMenuRender(event);
            }
            dropDownMenuItem.style.visibility = 'visible';
        }
    },

    /**
     * обработка мышки при уходе с эелемента меню и скрытие сабменю
     * @param event
     */
    mouseOutHandler(event) {
        if ((event.target.tagName === 'A')) {
            return;
        }
        let dropDownMenuItem = document.getElementsByClassName(this.settings.dropMenuClass)[0];
        dropDownMenuItem.style.visibility = 'hidden';

    },

    /**
     * определение название json файла по пункту меню
     * @param event
     * @returns {*}
     */
    dropDownMenuRender(event) {
        let jsonFile = 'json/' + event.target.textContent + '.json';
        return this.menuCreate(jsonFile, event);
    },

    /**
     * создание меню основного, сабменю и название сабменю
     * @param jsonFile
     * @param event
     * @returns {string}
     */
    menuCreate(jsonFile, event) {
        let result = '';
        let items = this.parseJson(jsonFile);
        if (event !== undefined) {
            result = '<p>' + event.target.textContent + '</p>';
        }

        for (let i = 0; i < items.length; i++) {
            if (parseInt(items[i].submenu)) {
                result += '<a href="' + items[i].href + '" data-dropmenu="' + items[i].submenu + '">' + items[i].title + '</a>';
            } else {
                result += '<a href="' + items[i].href + '">' + items[i].title + '</a>';
            }
        }
        return result;
    },

    /**
     * отправка запроса для json и парсинг его в массив
     * @param jsonFile
     * @returns {Array}
     */
    parseJson(jsonFile) {
        let xhr = new XMLHttpRequest();
        let myItems = [];
        xhr.open('GET', jsonFile, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status !== 200) {
                return;
            }
            myItems = JSON.parse(xhr.responseText);
        };

        xhr.send();
        return myItems;
    },
};

/**
 * Создание галлереи картинок из JSON
 * @type {{settings: {galleryClass: string, jsonFile: string}, render: (function(*=))}}
 */

let gallery = {

    /**
     * основыне настройки галлереи
     */
    settings: {
        galleryClass: '',
        jsonFile: '',
        galleryItemClass: '',
        galleryPreviewPrefix: '',
        galleryImgPath: '',
        galleryImgClass: '',
    },

    render(settings) {
        this.settings = Object.assign(this.settings, settings);
        let galleryContainer = document.getElementsByClassName(this.settings.galleryClass)[0];
        galleryContainer.innerHTML = this.galleryCreate(this.settings.jsonFile);
    },


    /**
     * Создание галлереи
     * @param jsonFile
     * @returns {string}
     */
    galleryCreate(jsonFile) {
        let item = this.parseJson(jsonFile);
        console.log(item);
        let result = '';
        let arr= [];
        let j;

        for (let i = 0; i<item.length; i++){
            arr[i] = parseInt(Math.random()*item.length);
        }

        for (let i =0; i< item.length; i++) {
            j=arr[i];
            result += '<div class="' + this.settings.galleryItemClass + '">';
            result += '<div class="' + this.settings.galleryImgClass + '">';
            result += '<a href="#modalWindow' + j + '"><img src="' + this.settings.galleryImgPath + item[j].srcp + '" alt="' + item[j].alt + '"></a>';
            result += '<div id="modalWindow' + j + '" class="modalWindow">';
            result += '<div>';
            result += '<a href="#close" class="close">';
            result += '<img src="'+ this.settings.galleryImgPath + item[j].src+ '" alt="' +item[j].alt+ '">';
            result += '</a></div></div></div></div>';
        }
        return result;
    },

    /**
     * парсинг JSON файла и возрат item
     * @param jsonFile
     * @returns {*}
     */
    parseJson(jsonFile) {
        let galleryItem;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', jsonFile, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                galleryItem = JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
        return galleryItem;
    },

};


/**
 * старт JS и задание основных параметров
 */
window.onload = function () {
    menu.render({
        menuClass: 'nav',
        jsonFile: 'json/toplinemenu.json',
        dropMenuClass: 'dropDownMenu',
    });

    gallery.render({
        galleryClass: 'gallery',
        galleryItemClass: 'galleryItem',
        galleryImgClass: 'galleryItemImg',
        galleryPreviewPrefix: '-preview',
        galleryImgPath: 'img/gallery/',
        jsonFile: 'json/gallery.json'
    });
};



