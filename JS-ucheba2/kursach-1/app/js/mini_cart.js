"use strict";

let miniCart = {


    init(data, wrapperClass) {

        localStorage["miniCart"] = data;

        // localStorage.clear();
        // console.log(JSON.parse(localStorage.getItem("miniCart")));


        // console.log(localStorage.getItem("miniCart") !== null);
        // let dataParse = localStorage["miniCart"];

        this.render(wrapperClass);
    },



    render(wrapperClass) {

        let ammount = 0;
        let price = 0;
        let templateItemContainer = '';
        let arr = JSON.parse(localStorage.getItem("miniCart")).contents;

        if (localStorage.getItem("miniCart") !== null) {

            for (let i = 0; i < arr.length; i++ ){
                let templateItem = `
             <div class="${wrapperClass}__item">
               <img class="${wrapperClass}__img" src="img/product1-6-290x340.jpg" alt="">
               <div class="${wrapperClass}__infoWrapper">
                 <p class="${wrapperClass}__price">${arr[i].quantity} x ${arr[i].price} руб. </p>
                 <p class="${wrapperClass}__description">${arr[i].product_name}</p>
               </div>
               <div class="${wrapperClass}__buttonWrapper">
                 <button class="button ${wrapperClass}__buttonDel" data-idproduct="${arr[i].id_product}">x</button>
               </div>
             </div>`;
                templateItemContainer = templateItemContainer + templateItem;
                price = price + arr[i].quantity*arr[i].price;
                ammount = ammount + arr[i].quantity;
            }

            let buttonCart = document.getElementsByClassName(`headerMiddle__myCart_mod`)[0];
            let buttonCartTemplate = `<span class="textPink">${ammount}&nbsp
                </span>товаров/<span class="textPink">&nbsp${price}&nbsp</span>руб`;
            buttonCart.innerHTML = buttonCartTemplate;

            let a= document.getElementsByClassName(`${wrapperClass}__wraper`)[0];
            a.innerHTML = templateItemContainer;

        } else  {






        }


    }
};