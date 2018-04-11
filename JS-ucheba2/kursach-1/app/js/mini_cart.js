"use strict";

let mini_cart = {

    render(data, wrapperClass) {
        console.log(data);
        console.log(wrapperClass);

        let struct = `
                    <div class="dropdownCart__item">
                        <img class="dropdownCart__img" src="img/product1-6-290x340.jpg" alt="">
                        <div class="dropdownCart__infoWrapper">
                            <p class="dropdownCart__price">2 x 90 руб. </p>
                            <p class="dropdownCart__description">Название товара очень длинное потомучто надо такое
                                чтобы было </p>
                        </div>
                        <div class="dropdownCart__buttonWrapper">
                            <button class="button dropdownCart__buttonDel">x</button>
                        </div>
                    </div>` ;

        let a = document.getElementsByClassName('dropdownCart__wraper')[0];
        a.innerHTML = struct+struct;
        console.log(a);
    }

};