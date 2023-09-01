// Находим форму в DOM
const popupAll = document.querySelectorAll('.popup'); //Всплывающее окно
const openFormEdit = document.querySelector('.profile__edit'); //кнопка открытия окна Редактировать
const profileAddCard = document.querySelector('.profile__add');

const profilePopup = document.querySelector("#profile-popup");
const profilePopupForm = profilePopup.querySelector('.form');
const profilePopupTitle = profilePopupForm.querySelector('.form__input_type_name');
const profilePopupSubtitle = profilePopupForm.querySelector('.form__input_type_description');
const cardPopup = document.querySelector("#card-popup");
const cardPopupForm = cardPopup.querySelector('.form');
const cardPopupTitle = cardPopupForm.querySelector('.form__input_type_name');
const cardPopupSubtitle = cardPopupForm.querySelector('.form__input_type_description');
const imagePopup = document.querySelector("#image-popup");
const formRectangle = document.querySelector('.form__rectangle');
const closeFormBtns = document.querySelectorAll('.popup__close'); 

const elementsCard = document.querySelector('.elements');
const elementCard = document.querySelector('.element');
const elementImage = document.querySelector('.element__mask-group');
const placeTemplate = document.querySelector("#place-template").content;

const formTitle = document.querySelector('.form__title');
const formSubmit = document.querySelector('.form__submit'); //Кнопка отправки информации в форме
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitle = document.querySelector('.profile__title');
const popupTitle = imagePopup.querySelector(".popup__title");
const picture = imagePopup.querySelector(".picture");

profileAddCard.addEventListener('click', openFormAddCard);
openFormEdit.addEventListener('click', openEditProfileForm);

popupAll.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(popup);
    }
  });
});

closeFormBtns.forEach((button) => {
  button.addEventListener('click', closeForm);
});

function closeForm (evt) {
  closePopup(evt.target.closest('.popup'));
}

function closeOpenedPopup(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeOpenedPopup);
}

function openPopup (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeOpenedPopup);
}

const cardsInfo = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});

function render() {
  cardsInfo.forEach(renderCard);
}

function renderCard({ name, link }) {
  elementsCard.prepend(createCard({name, link}));
}

function createCard(item) {
  const cardElement = placeTemplate
    .querySelector(".element")
    .cloneNode(true);
  const cardPicture = cardElement.querySelector(".element__mask-group");
  cardElement.querySelector(".element__title").textContent = item.name;
  cardPicture.src = item.link;
  cardPicture.alt = item.name;
  cardElement.querySelector('.element__group').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active');
  });

  cardElement.querySelector('.element__basket').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  cardElement.querySelector('.element__mask-group').addEventListener('click', function (evt) {
    openPopup (imagePopup);
    popupTitle.textContent = item.name;
    picture.src = item.link;
    picture.alt = item.name;
  });
  return cardElement;
}

render();

function handleFormSubmitCard (evt) {
    evt.preventDefault();
    renderCard({name: cardPopupTitle.value,
      link: cardPopupSubtitle.value});
    closePopup (cardPopup);
    evt.target.reset();
}

function submitEditProfileForm (evt) {
    evt.preventDefault();
    profileTitle.textContent = profilePopupTitle.value; 
    profileSubtitle.textContent = profilePopupSubtitle.value;
    closePopup (profilePopup);
}

cardPopupForm.addEventListener('submit', handleFormSubmitCard);
profilePopupForm.addEventListener('submit', submitEditProfileForm);

function openEditProfileForm () {
    profilePopupTitle.value = profileTitle.textContent;
    profilePopupSubtitle.value = profileSubtitle.textContent;
    openPopup (profilePopup); 
}

function openFormAddCard () {
    disableSubmitButton (cardPopup.querySelector('.form__submit'));
    openPopup (cardPopup);
}