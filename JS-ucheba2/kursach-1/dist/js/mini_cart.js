"use strict";

var mini_cart = {
    render: function render(data, wrapperClass) {
        console.log(data);
        console.log(wrapperClass);

        var struct = "\n                    <div class=\"dropdownCart__item\">\n                        <img class=\"dropdownCart__img\" src=\"img/product1-6-290x340.jpg\" alt=\"\">\n                        <div class=\"dropdownCart__infoWrapper\">\n                            <p class=\"dropdownCart__price\">2 x 90 \u0440\u0443\u0431. </p>\n                            <p class=\"dropdownCart__description\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430 \u043E\u0447\u0435\u043D\u044C \u0434\u043B\u0438\u043D\u043D\u043E\u0435 \u043F\u043E\u0442\u043E\u043C\u0443\u0447\u0442\u043E \u043D\u0430\u0434\u043E \u0442\u0430\u043A\u043E\u0435\n                                \u0447\u0442\u043E\u0431\u044B \u0431\u044B\u043B\u043E </p>\n                        </div>\n                        <div class=\"dropdownCart__buttonWrapper\">\n                            <button class=\"button dropdownCart__buttonDel\">x</button>\n                        </div>\n                    </div>";

        var a = document.getElementsByClassName('dropdownCart__wraper')[0];
        a.innerHTML = struct + struct;
        console.log(a);
    }
};