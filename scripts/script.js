// Находим форму в DOM
let pagePopup = document.querySelector('.popup'); //Всплывающее окно
let openFormEdit = document.querySelector('.profile__edit'); //кнопка открытия окна Редактировать
let closeFormBtn = document.querySelector('.popup__close'); //кнопка зкрытия окна 
let profileAddCard = document.querySelector('.profile__add');

let formPopup = document.querySelector('.form');
let formRectangle = document.querySelector('.form__rectangle');

let elementsCard = document.querySelector('.elements');
let elementCard = document.querySelector('.element');
let elementImage = document.querySelector('.element__mask-group');
const placeTemplate = document.querySelector("#place-template").content;

let formTitle = document.querySelector('.form__title');
let formSubmit = document.querySelector('.form__submit'); //Кнопка отправки информации в форме
let formtTitle = document.querySelector('.form__input_type_name');
let formSubtitle = document.querySelector('.form__input_type_description');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileTitle = document.querySelector('.profile__title');


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
closeFormBtn.addEventListener('click', closeForm);


function closeForm () {
    pagePopup.classList.remove('popup_active'); 
    document.querySelector('.picture').remove();
    document.querySelector('.popup__title').remove();
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    
    profileTitle.textContent = formtTitle.value; 
    profileSubtitle.textContent = formSubtitle.value;
    closeForm ();
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
  placeElement.querySelector('.element__group').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__group_active');
  });

  placeElement.querySelector('.element__basket').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  placeElement.querySelector('.element__mask-group').addEventListener('click', function (evt) {
    pagePopup.classList.add('popup_active');
    document.querySelector('.form').style.display = "none";
    document.querySelector('.popup__image').style.display = "flex";
    document.querySelector('.popup__container').style.margin = "0 40px";
    document.querySelector('.popup__image').insertAdjacentHTML("afterbegin", `<img src="${link}" alt="${name}" class="picture">
    <h2 class="popup__title">${name}</h2>`);
  });

  elementsCard.prepend(placeElement);
}

render();


function handleFormSubmitCard (evt) {
    evt.preventDefault();
    initialCards.unshift({name: formtTitle.value,
    link: formSubtitle.value});
    renderCard(initialCards[0]);
    closeForm ();
}
console.log(initialCards);



function openEdit () {
    pagePopup.classList.add('popup_active');
    document.querySelector('.form').style.display = "flex";
    document.querySelector('.popup__image').style.display = "none";
    document.querySelector('.popup__container').style.margin = "0 19px";
    formTitle.textContent = 'Редактировать профиль';
    formtTitle.placeholder="Жак-Ив Кусто";
    formSubtitle.placeholder="Исследователь океана";
    formtTitle.value = profileTitle.textContent;
    formSubtitle.value = profileSubtitle.textContent;
    formPopup.removeEventListener('submit', handleFormSubmitCard);
    formPopup.addEventListener('submit', handleFormSubmit);
    
}

function openFormAddCard () {
    pagePopup.classList.add('popup_active');
    document.querySelector('.form').style.display = "flex";
    document.querySelector('.popup__image').style.display = "none";
    document.querySelector('.popup__container').style.margin = "0 19px";
    formTitle.textContent = 'Новое место';
    formtTitle.placeholder="Название";
    formSubtitle.placeholder="Ссылка на картинку";
    formtTitle.value = '';
    formSubtitle.value = '';
    formPopup.removeEventListener('submit', handleFormSubmit);
    formPopup.addEventListener('submit', handleFormSubmitCard);
}





