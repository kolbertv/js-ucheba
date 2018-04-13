let loadCatalogData = {
    init(data) {

        localStorage.setItem("catalogData", data);
        let dataParse = JSON.parse(localStorage["catalogData"]);
        console.log(dataParse);
        this.render();
    },

    render() {
        let dataParse = JSON.parse(localStorage["catalogData"]);
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
                        <button class="button gallery__itemButton">Добавить</button>
                    </div>
            </div>`;
            gallaryItemContainer = gallaryItemContainer + galleryTemplate;
        }
        gallaryWrapper.innerHTML = gallaryItemContainer;
    }

};