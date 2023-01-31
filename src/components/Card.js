export default class Card {
  constructor(
    data,
    templateSelector,
    handleOpenPopupImg,
    onRemove,
    handle,
    userId
  ) {
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleOpenPopupImg = handleOpenPopupImg;
    this._onRemove = onRemove;
    this._handleLikeCard = handle;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".places__card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._likesCounter(); ////?
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;

    return this._element;
  }

  _likesCounter() {
    this._likes.length
      ? (this._likeCounter.textContent = this._likes.length)
      : (this._likeCounter.textContent = null);
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".places__icon-like");
    this._deleteButton = this._element.querySelector(".places__icon-basket");
    this._cardTitle = this._element.querySelector(".places__title");
    this._cardImage = this._element.querySelector(".places__image");
    this._likeCounter = this._element.querySelector(".places__like-counter"); ///
    this._showBasketIcon();
    this._showLikeCard();

    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopupImg(this._title, this._image);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this._data, this._userId);
    });

    this._deleteButton.addEventListener("click", () => {
      this._onRemove(this._id);
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _showBasketIcon() {
    if (this._owner !== this._userId) {
      this._deleteButton.classList.add("places__icon-basket_hidden");
    }
  }

  _showLikeCard() {
    this._likes.some((i) => i !== this._userId)
      ? this._likeButton.classList.add("places__icon-like_active")
      : this._likeButton.classList.remove("places__icon-like_active");
  }
}
