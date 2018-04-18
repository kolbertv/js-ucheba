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
        // console.log(dataParse);

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

        let data = JSON.parse(localStorage.getItem(this.settings.localCartStorageName));
        for (let index = 0; index < data.contents.length; index++) {
            if (parseInt(id_product) == parseInt(data.contents[index].id_product)) {
                data.contents[index].quantity = data.contents[index].quantity + 1;
                localStorage.setItem(this.settings.localCartStorageName, JSON.stringify(data));
                miniCart.render('dropdownCart');

            } else {





            }
        }

    },


    render(localCatalogStorageName) {
        let dataParse = JSON.parse(localStorage[localCatalogStorageName]);
        let gallaryWrapper = document.getElementsByClassName('gallery__itemWrapper')[0];
        let gallaryItemContainer = '';
        for (let index = dataParse.length - 1; index > dataParse.length - 6; index--) {

            let galleryTemplate = `
            <div class="gallery__item">
             <div class="gallery__containerItemImg"><img class="gallery__itemImg" src="img/${dataParse[index].imgName}"alt=""></div>
                    <div><p class="gallery__itemTitle">${dataParse[index].product_name}</p></div>
                    <div><p class="gallery__atings">*****</p></div>
                    <div><p class="gallery__price">${dataParse[index].price}</p></div>
                    <div>
                        <button class="button gallery__itemButton" data-id_product="${dataParse[index].id_product}">Добавить</button>
                    </div>
            </div>`;
            gallaryItemContainer = gallaryItemContainer + galleryTemplate;
        }
        gallaryWrapper.innerHTML = gallaryItemContainer;
    }

};