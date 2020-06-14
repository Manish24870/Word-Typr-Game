//Initial game state
const state = {
    hasStarted: false,
    startWord: "start",
    currentInput: "",
    currentScore: 0,
    highestScore: 0,
    newWord: "",
    remainingTime: 10,
};

const startGame = () => {
    state.newWord = getNewWord(state.hasStarted);
    changeUI(state.newWord);
};

//When user loses game
const loseGame = () => {
    loseGameUI();

    state.hasStarted = false;
    state.remainingTime = 10;
    state.currentInput = "";
    state.newWord = "";
    if (state.currentScore > state.highestScore) {
        state.highestScore = state.currentScore;
        setHighScore(state.currentScore);
        updateScoreUI(elements.highScorePara, state.currentScore);
    }
};

//Update current score and remaining time
const updateScoreCounter = (bonus) => {
    state.remainingTime += bonus;
    state.currentScore = updateScore(state.currentScore);
    updateScoreUI(elements.currScorePara, state.currentScore);
};

//Remaining time counter
const startCounter = () => {
    const timer = setInterval(() => {
        const remTime = Number((state.remainingTime - 0.1).toFixed(1));
        state.remainingTime = remTime;
        updateTimerUI(remTime);
        if (state.remainingTime <= 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 100);
};

//Function which controls user input
const inputControl = () => {
    state.currentInput = getInput().toLowerCase();

    if (state.currentInput === state.startWord) {
        //If game is started
        startGame();
        state.hasStarted = true;
        state.currentScore = 0;
        updateScoreUI(elements.currScorePara, 0);
        startCounter();
        elements.leaderboard.classList.remove("leaderboard-show");
    } else if (state.currentInput === state.newWord && state.hasStarted) {
        //If user types correct word
        startGame();
        updateScoreCounter(1.1);
    }
};

//EVENT LISTENER FOR USER TYPING
elements.formInput.addEventListener("input", () => {
    inputControl();
});

//EVENT LISTENER FOR WINDOW LOAD
window.addEventListener("load", () => {
    initializeUI();
    state.highestScore = getHighScore();
    updateScoreUI(elements.highScorePara, state.highestScore);
});

//SHOW LEADERBOARD EVENT LISTENER
elements.leaderboardButton.addEventListener("click", async () => {
    state.highestScore = getHighScore();
    updateScoreUI(elements.highScorePara, state.highestScore);
    elements.leaderboard.classList.toggle("leaderboard-show");
    if (elements.leaderboard.classList.contains("leaderboard-show")) {
        updateLeaderboardScoreUI(state.highestScore);
        addSpinner(elements.scoresTable);
        try {
            state.leaderboard = await getLeaderboard();
            renderLeaderboard(state.leaderboard);
            removeSpinner();
        } catch (err) {
            removeSpinner();
            alert("Error occured while fetching leaderboard data");
        }
    }
});
//ADD TO LEADERBOARD EVENT LISTENER
elements.leaderboardForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await addToLeaderboard();
    elements.leaderboardFormInput.value = "";
    state.leaderboard = await getLeaderboard();
    renderLeaderboard(state.leaderboard);
});

//HELP PAGE EVENT LISTENER
elements.helpButton.addEventListener("click", () => {
    window.location.href = "./help.html";
});
