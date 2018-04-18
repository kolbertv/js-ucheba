let miniCart = {

    init(data, wrapperClass, localCartStorageName) {

        localStorage[localCartStorageName] = data;

        // localStorage.clear();

        // let dataParse =JSON.parse(localStorage.getItem("miniCart"));
        // console.log(dataParse);

        // console.log(localStorage.getItem("miniCart") !== null);
        // let dataParse = localStorage["miniCart"];

        this.render(wrapperClass);
    },

    render(wrapperClass) {

        let ammount = 0;
        let price = 0;
        let templateItemContainer = '';

        if (localStorage.getItem("miniCart") !== null) {

            let arr = JSON.parse(localStorage.getItem("miniCart")).contents;
            console.log(arr);
            for (let i = 0; i < arr.length; i++) {
                let templateItem = `
             <div class="${wrapperClass}__item">
               <img class="${wrapperClass}__img" src="img/${arr[i].img}" alt="">
               <div class="${wrapperClass}__infoWrapper">
                 <p class="${wrapperClass}__price">${arr[i].quantity} x ${arr[i].price} руб. </p>
                 <p class="${wrapperClass}__description">${arr[i].product_name}</p>
               </div>
               <div class="${wrapperClass}__buttonWrapper">
                 <button class="button ${wrapperClass}__buttonDel" data-idproduct="${arr[i].id_product}">x</button>
               </div>
             </div>`;
                templateItemContainer = templateItemContainer + templateItem;
                price = price + arr[i].quantity * arr[i].price;
                ammount = ammount + arr[i].quantity;

            }

        } else {

            let templateItem = `
                <div class="${wrapperClass}__item">
                  <div class="${wrapperClass}__empty">
                      <p><i class="fas fa-shopping-cart"></i></p>
                      <p>В корзине ничего нет</p>
                   </div>
                </div>
            `;
            templateItemContainer = templateItem;
        }

        let buttonCart = document.getElementsByClassName(`headerMiddle__myCart_mod`)[0];
        let buttonCartTemplate = `<span class="textPink">${ammount}&nbsp
                </span>товаров/&nbsp<span class="textPink">${price}&nbsp</span>руб`;
        buttonCart.innerHTML = buttonCartTemplate;

        let a = document.getElementsByClassName(`${wrapperClass}__wraper`)[0];
        a.innerHTML = templateItemContainer;

    }
};