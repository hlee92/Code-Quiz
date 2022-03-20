function printHighScores() {
    var highscores = localStorage.getItem("highscores");
    highscores = JSON.parse(highscores);

    highscores.forEach(function (highscores) {
        var liTag = document.createElement("li");
        liTag.textContent = highscores.initials + " - " + highscores.userScore;

        var highscoresOlEl = document.getElementById("highscoresOl");
        highscoresOlEl.appendChild(liTag);
    });
}

function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

printHighScores();