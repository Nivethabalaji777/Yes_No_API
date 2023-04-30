// SELECTORS
const ballSelector = document.querySelector('#ball');
const buttonSelector = document.querySelector('#button');
const inputSelector = document.querySelector('#input');
const answerSelector = document.querySelector('#answer');
const errorSelector = document.querySelector('#error');
// API
const API_ENDPOINT = 'https://yesno.wtf/api';
// FLAGS
let isRequestInProgress = false;

//----------------------------------------------------------------------------

const setIsRequestInProgress = value => {
    isRequestInProgress = value;
};

const setDisableButtonState = isDisabling => {
    if (isDisabling) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
};

//Clear output after 3 seconds
const cleanupResponse = () => {
    setTimeout(() => {
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        setIsRequestInProgress(false);
        setDisableButtonState(false);
    }, 3000);
};

const showAnswer = answer => {
    setTimeout(() => {
        answerSelector.innerHTML = `<p>${answer}</p>`;
        ballSelector.classList.remove('shake__ball');
        cleanupResponse();
    }, 1000);
};

//Create a fetchAnswer function and call the API
const fetchAnswer = () => {
    setIsRequestInProgress(true);

    setDisableButtonState(true);
    ballSelector.classList.add('shake__ball');

    fetch(API_ENDPOINT)
        .then(data => data.json())
        .then(data => showAnswer(data.answer));
};

//error states
const showError = () => {
    errorSelector.innerHTML = 'You need to type your question';

    setTimeout(() => {
        errorSelector.innerHTML = '';
    }, 3000);
};

//Attach fetchAnswer to an event listener
const getAnswer = () => {
    if (isRequestInProgress) return;
    if (!inputSelector.value) return showError();

    fetchAnswer();
};

const handleKeyEnter = e => {
    if (e.keyCode === 13) {
        getAnswer();
    }
};

buttonSelector.addEventListener('click', getAnswer);

//------------------------------------------------------------------------------------------------------------------------