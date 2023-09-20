import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
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
const formRectangle = document.querySelector('.form__rectangle');
const closeFormBtns = document.querySelectorAll('.popup__close'); 
const imagePopup = document.querySelector("#image-popup");
const picture = document.querySelector('.picture');
const popupTitle = document.querySelector('.popup__title');

const elementCard = document.querySelector('.element');
const elementImage = document.querySelector('.element__mask-group');


const formTitle = document.querySelector('.form__title');
const formSubmit = document.querySelector('.form__submit'); //Кнопка отправки информации в форме
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitle = document.querySelector('.profile__title');
const elementsCard = document.querySelector('.elements');
const placeTemplate = document.querySelector("#place-template").content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

  const selectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  };

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

initialCards.map(function (item) {
  renderCard(item);
});

function handleCardClick(name, link) {
  popupTitle.textContent = name;
  picture.src = link;
  picture.alt = name;
  openPopup (imagePopup);
}

function createCard(item) {
  const card = new Card(item.name, item.link, placeTemplate, handleCardClick);
  const cardElement = card.render();
  return cardElement;
}

function renderCard(item) {
  elementsCard.prepend(createCard(item));
}

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

const formvalidatorProfile = new FormValidator(selectors, profilePopupForm);


function openEditProfileForm () {
    formvalidatorProfile.enableValidation();
    profilePopupTitle.value = profileTitle.textContent;
    profilePopupSubtitle.value = profileSubtitle.textContent;
    openPopup (profilePopup); 
}

const formvalidatorCard = new FormValidator(selectors, cardPopupForm);

function openFormAddCard () {
    formvalidatorCard.enableValidation();
    openPopup (cardPopup);
}