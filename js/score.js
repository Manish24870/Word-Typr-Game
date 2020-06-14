//Add 1 to current score
const updateScore = (cur) => {
    return cur + 1;
};

//Store high score in cookies
const setHighScore = (high) => {
    document.cookie = `highScore=${high};expires=Sun, 19 Jun 2022 12:00:00 UTC`;
};

//Get high score from cookies
const getHighScore = () => {
    const cookie = document.cookie;
    if (cookie) {
        const cookieArr = cookie.split("=");
        const high = Number(cookieArr[1]);
        return high;
    }
    return 0;
};

//Add data to Firebase database
const addToLeaderboard = async () => {
    const name = elements.leaderboardFormInput.value;
    if (name) {
        const newData = {
            name,
            score: getHighScore(),
        };
        db.collection("highScores").add(newData);
    } else {
        alert("Please enter a name");
    }
};

//Get the data from firebase
const getLeaderboard = async () => {
    const data = await db.collection("highScores").get();
    return data.docs;
};
