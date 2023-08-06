// Находим форму в DOM
let formElement = document.querySelector('.page__popUp'); //Всплывающее окно
let openFormBtn = document.querySelector('.profile__edit'); //кнопка открытия окна
let closeFormBtn = document.querySelector('.form__close_btn'); //кнопка зкрытия окна
let formSubmitText = document.querySelector('.form__submit'); //Кнопка отправки информации в форме
let elementGroup = document.querySelector('.element__group'); //Кнопка нравится
let likeBtnActive = document.querySelector('element__group_active'); //Кнопка нравится активная


let likeBtnCard1 = document.querySelector('.card1');
let likeBtnCard2 = document.querySelector('.card2');
let likeBtnCard3 = document.querySelector('.card3');
let likeBtnCard4 = document.querySelector('.card4');
let likeBtnCard5 = document.querySelector('.card5');
let likeBtnCard6 = document.querySelector('.card6');

let elementGroups = [likeBtnCard1, likeBtnCard2, likeBtnCard3, likeBtnCard4, likeBtnCard5, likeBtnCard6];

likeBtnCard1.addEventListener('click', likeBtn1);
likeBtnCard2.addEventListener('click', likeBtn2);
likeBtnCard3.addEventListener('click', likeBtn3);
likeBtnCard4.addEventListener('click', likeBtn4);
likeBtnCard5.addEventListener('click', likeBtn5);
likeBtnCard6.addEventListener('click', likeBtn6);

openFormBtn.addEventListener('click', openForm);
closeFormBtn.addEventListener('click', closeForm);


function likeBtn1 () {
    likeBtnCard1.classList.add('element__group_active');
    likeBtnCard1.classList.remove('element__group');
}

function likeBtn2 () {
    likeBtnCard2.classList.add('element__group_active');
    likeBtnCard2.classList.remove('element__group');
}

function likeBtn3 () {
    likeBtnCard3.classList.add('element__group_active');
    likeBtnCard3.classList.remove('element__group');
}

function likeBtn4 () {
    likeBtnCard4.classList.add('element__group_active');
    likeBtnCard4.classList.remove('element__group');
}

function likeBtn5 () {
    likeBtnCard5.classList.add('element__group_active');
    likeBtnCard5.classList.remove('element__group');
}

function likeBtn6 () {
    likeBtnCard6.classList.add('element__group_active');
    likeBtnCard6.classList.remove('element__group');
}


function closeForm () {
    formElement.style.display = "none";
}

function openForm () {
    formElement.style.display = "block";
}

function handleFormSubmit (evt) {
    evt.preventDefault();
    let textOne = document.querySelector('.form__text_first');
    let textTwo = document.querySelector('.form__text_second');
    let profileSubtitle = document.querySelector('.profile__subtitle');
    let profileTitle = document.querySelector('.profile__title')
    
    profileTitle.textContent = textOne.value; 
    profileSubtitle.textContent = textTwo.value;
    
    closeForm ();
}

formSubmitText.addEventListener('click', handleFormSubmit);