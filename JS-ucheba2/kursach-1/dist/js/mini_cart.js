"use strict";

var miniCart = {
        init: function init(data, wrapperClass) {

                localStorage["miniCart"] = data;

                // localStorage.clear();
                // console.log(JSON.parse(localStorage.getItem("miniCart")));


                // console.log(localStorage.getItem("miniCart") !== null);
                // let dataParse = localStorage["miniCart"];

                this.render(wrapperClass);
        },
        render: function render(wrapperClass) {

                var ammount = 0;
                var price = 0;
                var templateItemContainer = '';
                var arr = JSON.parse(localStorage.getItem("miniCart")).contents;

                if (localStorage.getItem("miniCart") !== null) {

                        for (var i = 0; i < arr.length; i++) {
                                var templateItem = "\n             <div class=\"" + wrapperClass + "__item\">\n               <img class=\"" + wrapperClass + "__img\" src=\"img/product1-6-290x340.jpg\" alt=\"\">\n               <div class=\"" + wrapperClass + "__infoWrapper\">\n                 <p class=\"" + wrapperClass + "__price\">" + arr[i].quantity + " x " + arr[i].price + " \u0440\u0443\u0431. </p>\n                 <p class=\"" + wrapperClass + "__description\">" + arr[i].product_name + "</p>\n               </div>\n               <div class=\"" + wrapperClass + "__buttonWrapper\">\n                 <button class=\"button " + wrapperClass + "__buttonDel\" data-idproduct=\"" + arr[i].id_product + "\">x</button>\n               </div>\n             </div>";
                                templateItemContainer = templateItemContainer + templateItem;
                                price = price + arr[i].quantity * arr[i].price;
                                ammount = ammount + arr[i].quantity;
                        }

                        var buttonCart = document.getElementsByClassName("headerMiddle__myCart_mod")[0];
                        var buttonCartTemplate = "<span class=\"textPink\">" + ammount + "&nbsp\n                </span>\u0442\u043E\u0432\u0430\u0440\u043E\u0432/<span class=\"textPink\">&nbsp" + price + "&nbsp</span>\u0440\u0443\u0431";
                        buttonCart.innerHTML = buttonCartTemplate;

                        var a = document.getElementsByClassName(wrapperClass + "__wraper")[0];
                        a.innerHTML = templateItemContainer;
                } else {}
        }
};