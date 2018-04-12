"use strict";

var loadCatalogData = {
    init: function init(data) {

        localStorage.setItem("catalogData", data);
        var dataParse = JSON.parse(localStorage["catalogData"]);

        console.log(dataParse);
    }
};