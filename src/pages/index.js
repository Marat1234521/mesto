// import './index.css';
////import logo from '../images/logo.svg';
//import ZhakImage from '../images/image.jpg';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// Находим форму в DOM
// const popupAll = document.querySelectorAll('.popup'); //Всплывающее окно
const openFormEditButton = document.querySelector('.profile__edit'); //кнопка открытия окна Редактировать
const profileAddCard = document.querySelector('.profile__add');

const headerLogoClass = document.querySelector(".header__logo");

const profilePopup = document.querySelector("#profile-popup");
const profilePopupForm = profilePopup.querySelector('.form');
const profilePopupTitle = profilePopupForm.querySelector('.form__input_type_name');
const profilePopupSubtitle = profilePopupForm.querySelector('.form__input_type_description');
const cardPopup = document.querySelector("#card-popup");
const cardPopupForm = cardPopup.querySelector('.form');
const cardPopupTitle = cardPopupForm.querySelector('.form__input_type_name');
const cardPopupSubtitle = cardPopupForm.querySelector('.form__input_type_description');
const formRectangle = document.querySelector('.form__rectangle');
// const closeFormBtns = document.querySelectorAll('.popup__close'); 
const imagePopup = document.querySelector("#image-popup");
// const picture = document.querySelector('.picture');
// const popupTitle = document.querySelector('.popup__title');

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

function handleCardClick(name, link) {
  popupPicture.open(name, link);
}

const popupPicture = new PopupWithImage('#image-popup');
popupPicture.setEventListeners();

function createCard(item) {
  const card = new Card(item.name, item.link, placeTemplate, handleCardClick);
  const cardElement = card.render();
  return cardElement;
}

const defaultCardList = new Section({
    renderer: (item) => {
      const cardElement = createCard(item);
      defaultCardList.addItem(cardElement);
    }
  },
  elementsCard
);

defaultCardList.renderItems(initialCards);

const user = new UserInfo({ userNameElement: profileTitle, userInfoElement: profileSubtitle });

const popupEditProfile = new PopupWIthForm({
  popupSelector: '#profile-popup',
  handleFormSubmit: (inputValues) => {
    user.setUserInfo({ name: inputValues[0] , about: inputValues[1] });
    popupEditProfile.close();
  }
});

popupEditProfile.setEventListeners();

const formvalidatorProfile = new FormValidator(selectors, profilePopupForm);
formvalidatorProfile.enableValidation();

function openFormEdit () {
  const userData = user.getUserInfo();
  profilePopupTitle.value = userData.name;
  profilePopupSubtitle.value = userData.about;
  popupEditProfile.open();
}

openFormEditButton.addEventListener('click', openFormEdit);

const popupAddCard = new PopupWIthForm({
  popupSelector: '#card-popup',
  handleFormSubmit: (cardsList) => {
    const cardsLists = [];
    cardsLists.push({name: cardsList[0], link: cardsList[1]});
    defaultCardList.renderItems(cardsLists);
    popupAddCard.close();
  }
});

popupAddCard.setEventListeners();

const formvalidatorCard = new FormValidator(selectors, cardPopupForm);
formvalidatorCard.enableValidation();

function popupAddCardOpen () {
  popupAddCard.open()
}

profileAddCard.addEventListener('click', popupAddCardOpen);