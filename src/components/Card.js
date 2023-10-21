export default class Card {
  constructor(data, placeTemplate, handleCardClick, { handleLikeClick, handleCardDelete }, currentUserId) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this.placeTemplate = placeTemplate
      .querySelector(".element")
      .cloneNode(true);
    this._likeButton = this.placeTemplate.querySelector('.element__group');
    this._submitButton = this.placeTemplate.querySelector('.element__basket');
    this._cardPicture = this.placeTemplate.querySelector(".element__mask-group");
    this._imagePopup = document.querySelector("#image-popup");
    this._popupTitle = this._imagePopup.querySelector(".popup__title");
    this._picture = this._imagePopup.querySelector(".picture");
  }

  _getView() {
    if (this._ownerId === this._currentUserId) {
      this._submitButton.classList.add('element__basket_active');
      console.log(this._submitButton.classList);
    }
}

  getId() {
    return this._id;
  }

  like() {
    return this._like;
  }

  renderCard() {
    this.placeTemplate.querySelector('.element__title').textContent = this._name;
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;

    this.placeTemplate.querySelector('.element__group-counter').textContent = this._likes.length;
    this._setEventListeners();
    this._getView();
    this.clickLike(this._data);
    return this.placeTemplate;
  }

  /*clickLike(data) {
    this._like = data.likes.filter((item) => { return item._id == this._currentUserId; }).length > 0;
    this.placeTemplate.querySelector('.element__group-counter').textContent = data.likes.length;
    if (this._like) {
        this._likeButton.classList.add('element__group_active');
    } else {
        this._likeButton.classList.remove('element__group_active');
    }
  }*/
  clickLike(data) {
    this._like = data.likes.filter((item) => { return item._id == this._currentUserId; }).length > 0;
    this.placeTemplate.querySelector('.element__group-counter').textContent = data.likes.length;
    if (this._like) {
        this._likeButton.classList.add('element__group_active');
    } else {
        this._likeButton.classList.remove('element__group_active');
    }
  }

  deleteCard() {
    this.placeTemplate.remove();
    this.placeTemplate = null;
  }

  _setEventListeners() {
    this._submitButton.addEventListener('click', () => this._handleCardDelete());

    this._likeButton.addEventListener('click', () => this._handleLikeClick());

    this._cardPicture.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

}