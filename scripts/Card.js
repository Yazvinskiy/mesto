import{openPopup} from './index.js';

export class Card {
    constructor(data, templateSelector) {
      this._title = data.name;
      this._image = data.link;
      this._templateSelector = templateSelector;
    }
  
    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector).content
        .querySelector('.places__card').cloneNode(true);
        
        return cardElement;    
    }
  
    generateCard() {
      // Запишем разметку в приватное поле _element. 
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
      this._setEventListeners();
      // Добавим данные
      this._element.querySelector('.places__title').textContent = this._title;
      this._element.querySelector('.places__image').src = this._image;
      this._element.querySelector('.places__image').alt = this._title;
      // Вернём элемент наружу
      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector('.places__image').addEventListener('click', () => {
          this._handleOpenPopupImg();
      });
  
      this._element.querySelector('.places__icon-like').addEventListener('click', () => {
          this._handleLikeCard();
      });
  
      this._element.querySelector('.places__icon-basket').addEventListener('click', () => {
          this._handleRemoveCard();
      });
  
  }
  
    _handleOpenPopupImg() {
        const popupFullImage = document.querySelector(".popup_type_full-image");
        const popupImg = document.querySelector(".popup__image");
        const popupFullImgCaption = document.querySelector(".popup__caption");
        popupFullImgCaption.textContent = this._title;
        popupImg.src = this._image;
        openPopup(popupFullImage);
    }
  
    _handleRemoveCard() {
      this._element.remove();   
    }
  
    _handleLikeCard() {
      this._element.querySelector('.places__icon-like').classList.toggle('places__icon-like_active');
    }
  
  } 