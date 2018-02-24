"use strict";

/**
 * @property {Object} settings Настройки галереи.
 */
const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageOnErrorSrc: 'images/max/onError.png',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',

    },

    /**
     * Инициализируем галерею.
     * @param {Object} settings Объект с настройками.
     */
    init(settings) {
        this.settings = Object.assign(this.settings, settings);

        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event))
    },

    /**
     * Обработчик события клика для открытия картинки.
     * @param {MouseEvent} event Событие клика мышью.
     * @param {string} event.target.dataset.full_image_url Событие клика мышью.
     */
    containerClickHandler(event) {
        if (event.target.tagName !== 'IMG') {
            return;
        }

        this.openImage(event.target.dataset.full_image_url);

    },

    /**
     * Открывает картинку.
     * @param {string} src Ссылка на картинку, которую надо открыть.
     */
    openImage(src) {

        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;

    },

    /**
     * Возвращает контейнер для открытой картинки.
     * @returns {Element}
     */
    getScreenContainer() {
        const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);

        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        return this.createScreenContainer();
    },

    /**
     * Создает контейнер для открытой картинки.
     * @returns {Element}
     */
    createScreenContainer() {
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        const image = new Image();

        image.classList.add(this.settings.openedImageClass);

        image.onerror = function () {
            console.log('картинка не загрузилась');
            this.src = gallery.settings.openedImageOnErrorSrc;
        },

        galleryWrapperElement.appendChild(image);
        document.body.appendChild(galleryWrapperElement);
        return galleryWrapperElement;
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },
};

window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});