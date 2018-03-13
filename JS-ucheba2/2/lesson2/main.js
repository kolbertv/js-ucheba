"use strict";

let menu = {
    settings: {
        menuClass: '',
        jsonFile: '',
        dropMenuClass: '',
    },

    dropDownMenuCheck: {
        result: '',
        exist: false,
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

    mouseOutHandler(event) {

        if ((event.target.tagName === 'A')) {
            return;
        }
        let dropDownMenuItem = document.getElementsByClassName(this.settings.dropMenuClass)[0];
        dropDownMenuItem.style.visibility = 'hidden';

    },

    dropDownMenuRender(event) {
        // console.log(event.target.textContent);
        let jsonFile = 'json/' + event.target.textContent + '.json';
        return this.menuCreate(jsonFile);
    },

    menuCreate(jsonFile) {
        let result = '';
        let items = this.parseJson(jsonFile);
        for (let i = 0; i < items.length; i++) {

            if (parseInt(items[i].submenu)) {
                result += '<a href="' + items[i].href + '" data-dropmenu="' + items[i].submenu + '">' + items[i].title + '</a>';
            } else {
                result += '<a href="' + items[i].href + '">' + items[i].title + '</a>';
            }
        }

        // console.log(result);
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
                return;
            }
            myItems = JSON.parse(xhr.responseText);
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



