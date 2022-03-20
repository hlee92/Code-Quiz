function printHighScores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

    highscores.sort(function(x, y) {
        return y.score - x.score;
    });

    highscores.forEach(function(highscores) {
        var liTag = document.createElement("li");
        liTag.textContent = highscores.initials + " - " + highscores.highscores;

        var olEl = document.getElementById("highscores");
        olEl.appendChild(liTag);
        });
    }

    function clearHighscores() {
        window.localStorage.removeItem("highscores");
        window.location.reload();
    }

    document.getElementById("clear").onclick = clearHighscores;

    printHighScores();