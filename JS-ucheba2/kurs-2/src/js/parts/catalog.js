let loadCatalogData = {

    settings: {
        data: '',
        localCatalogStorageName: 'catalogData',
        localCartStorageName: 'getBasket',
    },

    init(settings) {
        this.settings = Object.assign((this.settings, settings));
        localStorage.setItem(this.settings.localCatalogStorageName, this.settings.data);
        let dataParse = JSON.parse(localStorage[this.settings.localCatalogStorageName]);
        this.render(this.settings.localCatalogStorageName);
        document.getElementsByClassName('gallery__itemWrapper')[0].addEventListener('click', event => this.clickHandler(event))
    },

    /**
     * Обработка клика по кнопке
     * @param event
     */
    clickHandler(event) {

        if (event.target.tagName !== 'BUTTON') {
            console.log('not a button');
            return;
        }
        return this.addCart(event.target.dataset.id_product);
    },

    addCart(id_product) {

        let checkContain = false;
        let dataCart = JSON.parse(localStorage.getItem(this.settings.localCartStorageName));
        if (dataCart.contents.length !== null) {
            for (let index = 0; index < dataCart.contents.length; index++) {
                if (parseInt(id_product) == parseInt(dataCart.contents[index].id_product)) {
                    dataCart.contents[index].quantity = dataCart.contents[index].quantity + 1;
                    localStorage.setItem(this.settings.localCartStorageName, JSON.stringify(dataCart));
                    miniCart.render();
                    checkContain = true;
                }
            }

        } else {
            checkContain = true;
        }


        if (!checkContain) {

            let dataItemFromCatalog = JSON.parse(localStorage.getItem(this.settings.localCatalogStorageName))[parseInt(id_product - 1)];
            let arrLegth = dataCart.contents.length;
            let arrItem = {};
            arrItem.id_product = parseInt(id_product);
            arrItem.img = dataItemFromCatalog.img;
            arrItem.product_name = dataItemFromCatalog.product_name;
            arrItem.price = dataItemFromCatalog.price;
            arrItem.quantity = parseInt(1);
            dataCart.contents.push(arrItem);
            localStorage.setItem(this.settings.localCartStorageName, JSON.stringify(dataCart));
            miniCart.render();
        }
    },

    render(localCatalogStorageName) {
        let dataParse = JSON.parse(localStorage[localCatalogStorageName]);
        let gallaryWrapper = document.getElementsByClassName('gallery__itemWrapper')[0];
        let gallaryItemContainer = '';
        for (let index = dataParse.length - 1; index > dataParse.length - 6; index--) {

            let galleryTemplate = `
            <div class="gallery__item">
             <div class="gallery__containerItemImg"><img class="gallery__itemImg" src="img/${dataParse[index].img}"alt=""></div>
                    <div><p class="gallery__itemTitle">${dataParse[index].product_name}</p></div>
                    <div><p class="gallery__atings">*****</p></div>
                    <div><p class="gallery__price">${dataParse[index].price} ${dataParse[index].currency}</p></div>
                    <div>
                        <button class="button gallery__itemButton" data-id_product="${dataParse[index].id_product}">Добавить</button>
                    </div>
            </div>`;
            gallaryItemContainer = gallaryItemContainer + galleryTemplate;
        }
        gallaryWrapper.innerHTML = gallaryItemContainer;
    }

};