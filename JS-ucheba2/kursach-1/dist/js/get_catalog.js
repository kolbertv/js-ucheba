"use strict";

var loadCatalogData = {
    init: function init(data) {

        localStorage.setItem("catalogData", data);
        var dataParse = JSON.parse(localStorage["catalogData"]);
        console.log(dataParse);
        this.render();
    },
    render: function render() {
        var dataParse = JSON.parse(localStorage["catalogData"]);
        var gallaryWrapper = document.getElementsByClassName('gallery__itemWrapper')[0];
        var gallaryItemContainer = '';
        for (var index = dataParse.length - 1; index > dataParse.length - 6; index--) {

            var galleryTemplate = "\n            <div class=\"gallery__item\">\n             <div class=\"gallery__containerItemImg\"><img class=\"gallery__itemImg\" src=\"img/" + dataParse[index].imgName + "\"alt=\"\"></div>\n                    <div><p class=\"gallery__itemTitle\">" + dataParse[index].product_name + "</p></div>\n                    <div><p class=\"gallery__atings\">*****</p></div>\n                    <div><p class=\"gallery__price\">" + dataParse[index].price + "</p></div>\n                    <div>\n                        <button class=\"button gallery__itemButton\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C</button>\n                    </div>\n            </div>";
            gallaryItemContainer = gallaryItemContainer + galleryTemplate;
        }
        gallaryWrapper.innerHTML = gallaryItemContainer;
    }
};