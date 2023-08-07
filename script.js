// Находим форму в DOM
let pagePopup = document.querySelector('.popup'); //Всплывающее окно
let openFormBtn = document.querySelector('.profile__edit'); //кнопка открытия окна
let closeFormBtn = document.querySelector('.popup__close'); //кнопка зкрытия окна

let formRectangle = document.querySelector('.form');

let formSubmit = document.querySelector('.form__submit'); //Кнопка отправки информации в форме
let formtTitle = document.querySelector('.form__text-title');
let formSubtitle = document.querySelector('.form__text-subtitle');
let profileSubtitle = document.querySelector('.profile__subtitle');
let profileTitle = document.querySelector('.profile__title');


openFormBtn.addEventListener('click', openForm);
closeFormBtn.addEventListener('click', closeForm);


function closeForm () {
    pagePopup.classList.remove('popup_active'); 
}

function openForm () {
    pagePopup.classList.add('popup_active');
}


 function handleFormSubmit (evt) {
    evt.preventDefault();
    
    profileTitle.textContent = formtTitle.value; 
    profileSubtitle.textContent = formSubtitle.value;
    closeForm ();
}

formRectangle.addEventListener('submit', handleFormSubmit);