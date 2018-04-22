let wrapperClass = 'dropdownCart';
let localCartStorageName = 'miniCart';

let miniCart = {

    // init(data, localCartStorageName) {
    //     localStorage[localCartStorageName] = data;
    //     this.render();
    // },

    empyCart: {
        amoun: 0,
        countGoods: 0,
        contents: []
    },

    init() {

        if (localStorage.getItem(localCartStorageName) === null) {

            localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
            document.getElementsByClassName(wrapperClass)[0].addEventListener('click', click => this.clickHandler(event));
            miniCart.render();

        } else {

            document.getElementsByClassName(wrapperClass)[0].addEventListener('click', click => this.clickHandler(event));
            miniCart.render();
        }

    },


    clickHandler(event) {

        console.log(event);

        // if (event.target.dataset.button_name === 'clear') {
        //     localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
        //     miniCart.render();
        // }

        switch (event.target.dataset.button_name) {

            case 'clear':

                localStorage.setItem(localCartStorageName, JSON.stringify(miniCart.empyCart));
                break;

            case 'delete':

                this.delete(event);
                break;

        }

        miniCart.render();

    },


    delete(event) {

        let id = event.target.dataset.id_product;
        let arr = JSON.parse(localStorage.getItem(localCartStorageName));
        for (let index=0; index < arr.contents.length;index++){
            if (parseInt(arr.contents[index].id_product) === parseInt(id)) {

                if (parseInt(arr.contents[index].quantity)>1){
                    arr.contents[index].quantity = arr.contents[index].quantity - 1;
                } else {

                    arr.contents.splice(index,1);
                }
            }
        }

        localStorage.setItem(localCartStorageName, JSON.stringify(arr));

    },

    render() {

        let ammount = 0;
        let price = 0;
        let templateItemContainer = '';

        let arr = JSON.parse(localStorage.getItem("miniCart")).contents;

        let tempDropDownCart = document.getElementsByClassName('dropdownCart')[0];
        tempDropDownCart.innerHTML = '';



        if (arr.length !== 0) {

            let tempDropDownCartItemWraper = document.createElement('div');
            tempDropDownCartItemWraper.className = 'dropdownCart__itemWraper';

            let dropdownCart__buttonWrapper = document.createElement('div');
            dropdownCart__buttonWrapper.className = 'dropdownCart__buttonWrapper';

            tempDropDownCart.appendChild(tempDropDownCartItemWraper);
            tempDropDownCart.appendChild(dropdownCart__buttonWrapper);

            for (let i = 0; i < arr.length; i++) {

                let tempDropDownCartItem = document.createElement('div');
                tempDropDownCartItem.className ='dropdownCart__item';
                tempDropDownCartItem.innerHTML = `<img class="dropdownCart__img" src="img/${arr[i].img}" alt="">`;

                let tempDropDownInfoWraper = document.createElement('div');
                tempDropDownInfoWraper.className ='dropdownCart__infoWrapper';
                let pPrice = document.createElement('p');
                pPrice.className = 'dropdownCart__price';
                pPrice.innerHTML = `${arr[i].quantity} x ${arr[i].price} руб.`;
                tempDropDownInfoWraper.appendChild(pPrice);
                let pDescr = document.createElement('p');
                pDescr.className = 'dropdownCart__description';
                pDescr.innerHTML = `${arr[i].product_name}`;
                tempDropDownInfoWraper.appendChild(pDescr);

                tempDropDownCartItem.appendChild(tempDropDownInfoWraper);
                tempDropDownCartItemWraper.appendChild(tempDropDownCartItem);

                let tempButton = document.createElement('div');
                tempButton.innerHTML = `<button class="button dropdownCart__buttonDel" data-button_name="delete" data-id_product="${arr[i].id_product}">x</button>`;
                tempDropDownCartItem.appendChild(tempButton);

                price = price + arr[i].quantity * arr[i].price;
                ammount = ammount + arr[i].quantity;

            }

            let button = `
                    <button class="button dropdownCart__button dropdownCart__button_mod" data-button_name="check">Оформить</button>
                    <button class="button dropdownCart__button dropdownCart__button_mod" data-button_name="cart">Корзина</button>
                    <button class="button dropdownCart__button dropdownCart__button_mod" data-button_name="clear">Очистить</button>
                    `;

            dropdownCart__buttonWrapper.innerHTML = button;

        } else {

            // console.log('miniCart.render выводит пустую форму без товаров');
            let templateItem = `
                  <div class="dropdownCart__empty">
                      <p class="dropdownCart__imgCart"><i class="fa fa-shopping-cart"></i></p>
                      <p>В корзине ничего нет</p>
                   </div>
            `;

            tempDropDownCart.innerHTML=templateItem;
        }

        let buttonCart = document.getElementsByClassName(`headerMiddle__myCart_mod`)[0];
        let buttonCartTemplate = `<span class="textPink">${ammount}&nbsp
                </span>товаров/&nbsp<span class="textPink">${price}&nbsp</span>руб`;
        buttonCart.innerHTML = buttonCartTemplate;

    }
};