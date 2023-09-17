class Card {
  constructor(name, link, placeTemplate) {
    this.name = name;
    this.link = link;
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
  

  _createCard() {
    this.placeTemplate.querySelector(".element__title").textContent = this.name;
    this._cardPicture.src = this.link;
    this._cardPicture.alt = this.name;
  }


  _toggleLike() {
    this._likeButton.classList.toggle('element__group_active');
  }

  _deleteCard() {
    this._submitButton.closest('.element').remove();
  }

  _handleImageClick() {
    this._imagePopup.classList.toggle('popup_opened');
    this._popupTitle.textContent = this.name;
    this._picture.src = this.link;
    this._picture.alt = this.name;
  }

  _setListeners() {
    this._likeButton.addEventListener('click', () => this._toggleLike());
    
    this._submitButton.addEventListener('click', () => this._deleteCard());
  
    this._cardPicture.addEventListener('click',() => this._handleImageClick());
  } 
  
  render() {
    this._createCard();
    this._setListeners();
    return this.placeTemplate;
  }
}
