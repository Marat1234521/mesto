import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWIthForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';

const openFormEditButton = document.querySelector('.profile__edit'); //кнопка открытия окна Редактировать
const profileAddCard = document.querySelector('.profile__add');

const profilePopup = document.querySelector("#profile-popup");
const profilePopupForm = profilePopup.querySelector('.form');
const profilePopupTitle = profilePopupForm.querySelector('.form__input_type_name');
const profilePopupSubtitle = profilePopupForm.querySelector('.form__input_type_description');
const cardPopup = document.querySelector("#card-popup");
const cardPopupForm = cardPopup.querySelector('.form');
const avatarPopup = document.querySelector("#avatar-popup");
const avatarPopupForm = avatarPopup.querySelector('.form');
const avatarImg = document.querySelector('.profile__avatar');
const formSubmit = document.querySelector('.form__submit'); //Кнопка отправки информации в форме
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileTitle = document.querySelector('.profile__title');
const elementsCard = document.querySelector('.elements');
const placeTemplate = document.querySelector("#place-template").content;

  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77/',
    headers: {
      authorization: 'f096e9c2-eb55-410c-82ab-0b0e34cd39d8',
      'Content-Type': 'application/json'
    }
  });

  const selectors = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  };

const validAvatar = new FormValidator(selectors, avatarPopupForm);
// validAvatar.enableValidation();

const formvalidatorCard = new FormValidator(selectors, cardPopupForm);
// formvalidatorCard.enableValidation();

const formvalidatorProfile = new FormValidator(selectors, profilePopupForm);
// formvalidatorProfile.enableValidation();

function handleCardClick(name, link) {
  popupPicture.open(name, link);
}

const popupPicture = new PopupWithImage('#image-popup');
popupPicture.setEventListeners();

const popupTypeChoice = new PopupWithConfirmation('#prevent-popup', function(card) {
 console.log(card + ' this')
  api.deleteCard(card.getId())
      .then(() => {
          console.log('должно закрыть')
          card.deleteCard();
          // popupTypeChoice.close();
      })
      .catch((err) => {
          console.log(`${err}`);
      });
});

// popupTypeChoice.setEventListeners();

let currentUserId = null;

function handleLikeClick(card, data) {
    const promise = card.like() ? api.dislikeCard(data._id) : api.likeCard(data._id);
    promise
        .then((data) => {
            card.clickLike(data);
        })
        .catch((err) => {
            console.log(`${err}`);
        });
}

function handleCardDelete(card) {
  console.log(card);
  console.log('new');
  
  popupTypeChoice.setEventListeners(card);

  // popupTypeChoice.setFormSubmitHandler(card);
  //Не могу разобраться почему срабатывает автоматически
  popupTypeChoice.open();
}

function createCard(data, currentUserId, defaultCardList) {
  const newCard = new Card(data,
      placeTemplate,
      handleCardClick, {
          handleLikeClick: () => handleLikeClick(newCard, data),
          handleCardDelete: () => handleCardDelete(newCard)
      },
      currentUserId);
  const cardElement = newCard.renderCard();
  defaultCardList.addItem(cardElement);
}

const user = new UserInfo({ userNameElement: profileTitle, userInfoElement: profileSubtitle, avatarImg: avatarImg });

const popupEditProfile = new PopupWIthForm({
  popupSelector: '#profile-popup',
  handleFormSubmit: (item) => {
      item['name'] = item['name-input'];
      item['about'] = item['description-input'];
      delete item['name-input'];
      delete item['description-input'];
      popupEditProfile.renderLoading(true);
      api.setUserInfo(item)
          .then((data) => {
              user.setUserInfo(data);
              popupEditProfile.close();
          })
          .catch((err) => {
              console.log(`${err}`);
          })
          .finally(() => {
            popupEditProfile.renderLoading(false);
          })
  }
});

popupEditProfile.setEventListeners();

function openFormEdit () {
  formvalidatorProfile.enableValidation();
  const userData = user.getUserInfo();
  profilePopupTitle.value = userData.name;
  profilePopupSubtitle.value = userData.about;
  popupEditProfile.open();
}

openFormEditButton.addEventListener('click', openFormEdit);

const defaultCardList = new Section({
  renderer: (item) => {
    createCard(item, currentUserId, defaultCardList);
  },
}, elementsCard);

const popupAddCard = new PopupWIthForm({
  popupSelector: '#card-popup',
  handleFormSubmit: (item) => {
      item['name'] = item['picture-input'];
      item['link'] = item['url-input'];
      delete item['picture-input'];
      delete item['url-input'];
      popupAddCard.renderLoading(true);
      api.createCard(item)
          .then((data) => {
              createCard(data, currentUserId, defaultCardList);
              popupAddCard.close();
          })
          .catch((err) => {
              console.log(`${err}`);
          })
          .finally(() => {
            popupAddCard.renderLoading(false);
          })
  }
});

popupAddCard.setEventListeners();

function popupAddCardOpen () {
  formvalidatorCard.enableValidation();
  popupAddCard.open()
}

profileAddCard.addEventListener('click', popupAddCardOpen);

const popupEditAvatar = new PopupWIthForm({
  popupSelector: '#avatar-popup',
  handleFormSubmit: (item) => {
      item['avatar'] = item['nameurl-input'];
      delete item['nameurl-input'];
      popupEditAvatar.renderLoading(true);
      api.setAvatar(item)
          .then((data) => {
              user.setUserInfo(data);
              popupEditAvatar.close();
          })
          .catch((err) => {
              console.log(`${err}`)
          })
          .finally(() => {
            popupEditAvatar.renderLoading(false);
          })
  }
});

popupEditAvatar.setEventListeners();

function popupAvatarOpen () {
  validAvatar.enableValidation();
  popupEditAvatar.open();
}

avatarImg.addEventListener('click', popupAvatarOpen);

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cards, userData]) => {
      user.setUserInfo(userData);
      currentUserId = userData._id;

      defaultCardList.renderItems(cards);
  })
  .catch((err) => {
      console.log(`${err}`);
  });