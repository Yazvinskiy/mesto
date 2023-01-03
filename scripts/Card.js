export class Card {
    constructor(data, templateSelector, handleOpenPopupImg) {
      this._title = data.name;
      this._image = data.link;
      this._templateSelector = templateSelector;
      this._handleOpenPopupImg = handleOpenPopupImg;
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
      
      this._cardTitle.textContent = this._title;
      this._cardImage.src = this._image;
      this._cardImage.alt = this._title;
  
      return this._element;
    }
  
    _setEventListeners() {

      this._likeButton = this._element.querySelector('.places__icon-like');
      this._deleteButton = this._element.querySelector('.places__icon-basket');
      this._cardTitle = this._element.querySelector('.places__title');
      this._cardImage = this._element.querySelector('.places__image');

      this._cardImage.addEventListener('click', () => {
          this._handleOpenPopupImg(this._title, this._image);
      });
  
      this._likeButton.addEventListener('click', () => {
          this._handleLikeCard();
      });
  
      this._deleteButton.addEventListener('click', () => {
          this._handleRemoveCard();
      });

  }
  
    _handleRemoveCard() {
      this._element.remove(); 
      this._element = null;
    }
  
    _handleLikeCard() {
      this._likeButton.classList.toggle('places__icon-like_active');
    }
  
  } 