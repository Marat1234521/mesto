class Card {
  constructor(name, link, placeTemplate) {
    this.name = name;
    this.link = link;
    this.placeTemplate = placeTemplate;
  }

  _createCard() {
    this.placeTemplate = this.placeTemplate
      .querySelector(".element")
      .cloneNode(true);
    const cardPicture = this.placeTemplate.querySelector(".element__mask-group");
    this.placeTemplate.querySelector(".element__title").textContent = this.name;
    cardPicture.src = this.link;
    cardPicture.alt = this.name;
  }
  _setListeners() {
    this.placeTemplate.querySelector('.element__group').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__group_active');
    });
  
    this.placeTemplate.querySelector('.element__basket').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
    });
  
    this.placeTemplate.querySelector('.element__mask-group').addEventListener('click', function (evt) {
      popupTitle.textContent = this.name;
      picture.src = this.link;
      picture.alt = this.name;
    });
  }
  render() {
    this._createCard();
    this._setListeners();
    return this.placeTemplate;
  }
}
