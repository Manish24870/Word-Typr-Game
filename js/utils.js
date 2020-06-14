//DOM elements
const elements = {
    formInput: document.querySelector(".form-text-input"),
    infoTextPara: document.querySelector(".info-text"),
    timeDisplayPara: document.querySelector(".time-left"),
    currScorePara: document.querySelector(".current-score-val"),
    highScorePara: document.querySelector(".top-score-val"),
    leaderboard: document.querySelector(".leaderboard"),
    leaderboardButton: document.querySelector(".global-leaderboard-button"),
    leaderboardForm: document.querySelector(".form-leaderboard"),
    leaderboardFormInput: document.querySelector(".form-leaderboard-input"),
    leaderboardFormScore: document.querySelector(".form-leaderboard-score"),
    scoresTable: document.querySelector(".scores-table"),
    scores: document.querySelector(".scores"),
    helpButton: document.querySelector(".help-button"),
};

//Add a loading spinner
const addSpinner = (parent) => {
    const el = `
        <div class="loading"></div>
        `;

    parent.insertAdjacentHTML("afterbegin", el);
};

//Remove a loading spinner
const removeSpinner = () => {
    const el = document.querySelector(".loading");
    if (el) {
        el.parentElement.removeChild(el);
    }
};

//FIREBASE CONFIGURATION
const firebaseConfig = {
    apiKey: "AIzaSyDQJZs5bdnz868eWo7VmtNmMJSP-AH-tcY",
    authDomain: "word-typr.firebaseapp.com",
    databaseURL: "https://word-typr.firebaseio.com",
    projectId: "word-typr",
    storageBucket: "word-typr.appspot.com",
    messagingSenderId: "793649987489",
    appId: "1:793649987489:web:3a0a5d76bc011a809895e0",
    measurementId: "G-PG9L7PE06N",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
