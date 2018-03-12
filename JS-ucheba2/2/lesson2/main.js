"use strict";

let menu = {
    settings: {
        menuClass: '',
        jsonFile: '',
        dropMenuClass: '',
    },

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

    mouseOverHandler(event) {
        if ((event.target.tagName !== 'A') && (event.target.className !== this.settings.dropMenuClass)) {
            return;
        }

        let dropDownMenuItem = document.getElementsByClassName(this.settings.dropMenuClass)[0];

        if (event.target.tagName === 'A') {
            let elem = event.target.getBoundingClientRect();
            dropDownMenuItem.style.left = parseInt(elem.left) - 30 + 'px';
        }

        dropDownMenuItem.innerHTML = this.dropDownMenuRender();

        if (this.dropDownMenuRender() !== '0') {
            dropDownMenuItem.style.visibility = 'visible';

        }

    },

    mouseOutHandler(event) {

        if ((event.target.tagName === 'A') && (event.target.className === this.settings.dropMenuClass)) {
            return;
        }

        let dropDownMenuItem = document.getElementsByClassName(this.settings.dropMenuClass)[0];
        dropDownMenuItem.style.visibility = 'hidden';

    },


    dropDownMenuRender(elm) {

        let result = '';
        let items = this.parseJson(this.settings.jsonFile);

        for (let i = 0; i < items.length; i++) {


            result += '<a href="' + items[i].href + '">' + items[i].title + '</a>';
            console.log(items[i].submenu);

        }
        return result;


    },


    menuCreate(jsonFile) {
        let result = '';
        let items = this.parseJson(jsonFile);
        // console.log(items);
        for (let i = 0; i < items.length; i++) {
            result += '<a href="' + items[i].href + '">' + items[i].title + '</a>';
        }
        return result;
    },

    parseJson(jsonFile) {
        let xhr = new XMLHttpRequest();
        let myItems = [];
        xhr.open('GET', jsonFile, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }
            if (xhr.status !== 200) {
                console.log('ошибка' + xhr.status);
                return;
            }
            myItems = JSON.parse(xhr.responseText);
            // console.log(myItems);
        };
        xhr.send();
        return myItems;
    },
};


window.onload = function () {
    menu.render({
        menuClass: 'nav',
        jsonFile: 'json/toplinemenu.json',
        dropMenuClass: 'dropDownMenu',
    });
};


