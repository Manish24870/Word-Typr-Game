// import { elements } from "../utils/base";

const getInput = () => {
    return elements.formInput.value;
};

//Update UI when user starts or gets correct answer
const changeUI = (newWrd) => {
    elements.formInput.placeholder = newWrd;
    elements.formInput.value = "";
    elements.infoTextPara.textContent = newWrd;
};

//Updates the score in the UI
const updateScoreUI = (element, score) => {
    element.textContent = score;
};

const updateTimerUI = (time) => {
    elements.timeDisplayPara.textContent = `${time} sec`;
};

const updateLeaderboardScoreUI = (val) => {
    elements.leaderboardFormScore.value = val;
};

//Function which resets the game
const initializeUI = () => {
    elements.currScorePara.textContent = 0;
    elements.timeDisplayPara.textContent = "10.0 sec";
};

//Function which shows UI for losing the game
const loseGameUI = () => {
    elements.infoTextPara.innerHTML = `<span class="info-text-h-red">Game Over!</span> Type <span class="info-text-h">'start'</span> to start the game`;
    elements.formInput.placeholder = "'start'";
    elements.formInput.value = "";
};

//Function which renders the leaderboard
const renderLeaderboard = (scores) => {
    elements.scoresTable.textContent = "";
    scores.forEach((score) => {
        const data = score.data();
        const newEl = `
            <tr class="score-row">
                <td>${data.name}</td>
                <td>${data.score}</td>
            </tr>    
        `;
        elements.scoresTable.insertAdjacentHTML("beforeend", newEl);
    });
};
