// Находим форму в DOM
const popup = document.querySelector('.popup'); //Всплывающее окно
const openedPopup = document.querySelector('.popup_opened');
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


profileAddCard.addEventListener('click', openFormAddCard);
openFormEdit.addEventListener('click', openEdit);
closeFormBtns.forEach((button) => {
  button.addEventListener('click', closeForm);
});

function closeForm (evt) {
  closePopup(evt.target.closest('.popup')); 
  document.querySelector('.picture').remove();
  document.querySelector('.popup__title').remove();
}

function closePopup (popup) {
    popup.classList.remove('popup_opened'); 
}

function openPopup (popup) {
    popup.classList.add('popup_opened');
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
  const placeElement = placeTemplate
    .querySelector(".element")
    .cloneNode(true);
  placeElement.querySelector(".element__title").textContent = name;
  placeElement.querySelector(".element__mask-group").src = link;
  placeElement.querySelector(".element__mask-group").alt = name;
  placeElement.querySelector('.element__group').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active');
  });

  placeElement.querySelector('.element__basket').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  placeElement.querySelector('.element__mask-group').addEventListener('click', function (evt) {
    openPopup (imagePopup);
    document.querySelector('.popup__image').insertAdjacentHTML("afterbegin", `<img src="${link}" alt="${name}" class="picture">
    <h2 class="popup__title">${name}</h2>`);
  });

  elementsCard.prepend(placeElement);
}

render();

function handleFormSubmitCard (evt) {
    evt.preventDefault();
    renderCard({name: cardPopupTitle.value,
      link: cardPopupSubtitle.value});
    closePopup (cardPopup);
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = profilePopupTitle.value; 
    profileSubtitle.textContent = profilePopupSubtitle.value;
    closePopup (profilePopup);
}

cardPopupForm.addEventListener('submit', handleFormSubmitCard);
profilePopupForm.addEventListener('submit', handleFormSubmit);

function openEdit () {
    openPopup (profilePopup);
    profilePopupTitle.value = profileTitle.textContent;
    profilePopupSubtitle.value = profileSubtitle.textContent;
}

function openFormAddCard () {
    openPopup (cardPopup);
    formtTitle.value = '';
    formSubtitle.value = '';
}





