var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["boolean", "strings", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "What does CSS stand for?",
        choices: ["Color Style Sheet", "Computer Style Sheet", "Code Style Sheet", "Cascading Style Sheet"],
        answer: "Cascading Style Sheet"
    },
    {
        question: "The condition in a if/else statement is enclosed within _____. ",
        choices: ["quotation marks", "parentheses", "curly brackets", "square brackets"],
        answer: "curly brackets"
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables",
        choices: ["commas", "curly brackets", "quotation marks", "parentheses"],
        answer: "quotation marks"
    },
    {
        question: "What are the different type of Pop up boxes available in JavaScript?",
        choices: ["Alert", "Confirm", "Prompt", "All the above"],
        answer: "All the above"
    },
    {
        question: "True or false? You must be good at math to code:",
        choices: ["true", "false"],
        answer: "false"
    }
];


var beginButton = document.querySelector("#begin");
var submitButton = document.querySelector("#submit");
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var initialsEl = document.querySelector("#initials");
var questionIndex = 0;
var time = questions.length * 20;
var timerId;
var score;

function startQuiz() {
    var startPageEl = document.getElementById("start-page");
    startPageEl.setAttribute("class", "hide");

    var endPageEl = document.getElementById("end-page");
    endPageEl.setAttribute("class", "hide");

    var questionsEl = document.getElementById("questions");
    questionsEl.removeAttribute("class", "hide");


    timerId = setInterval(tick, 1000);

    timerEl.textContent = time;

    score = 0;

    nextQuestion();
}


function tick() {
    time -= 1;
    timerEl.textContent = time;
    if (time < 0) {
        endQuiz();
    }
}


function nextQuestion() {
    var questionObject = questions[questionIndex];

    var titleEl = document.getElementById("add-questions");
    titleEl.innerText = questionObject.question;
    console.log(questionObject);
    choicesEl.innerHTML = "";

    for (let i = 0; i < questionObject.choices.length; i++) {
        var answerButton = choicesEl.appendChild(document.createElement("button"));
        answerButton.innerText = questionObject.choices[i];
        answerButton.setAttribute("answer", questionObject.answer);
        answerButton.addEventListener("click", selectChoice);
    }
}




function selectChoice() {
    var theirAnswer = this.innerText;
    var trueAnswer = this.getAttribute("answer");
    var correct = trueAnswer === theirAnswer;
    var questionStatusEl = document.getElementById("question-status");
    if (correct) {
        questionStatusEl.innerText = "Correct!";
        score += 1;



    } else {
        questionStatusEl.innerText = "Incorrect!";
        time -= 10;

    }
    questionStatusEl.removeAttribute("class", "hide");
    setTimeout(function () {
        questionStatusEl.setAttribute("class", "hide");
    }, 1000)
    questionIndex += 1;

    setTimeout(function () {
        if (questionIndex === questions.length) {
            endQuiz();

        } else {
            nextQuestion();

        }
    }, 1000)

}

function endQuiz() {
    var endPageEl = document.getElementById("end-page");
    endPageEl.removeAttribute("class", "hide");

    var questionsEl = document.getElementById("questions");
    questionsEl.setAttribute("class", "hide");

    var timerEl = document.getElementById("timer");
    timerEl.setAttribute("class", "hide");

    var scoreEl = document.getElementById("final-score");
    scoreEl.innerText = score;

    return score;
}


function saveHighScore() {

    var initials = initialsEl.value.trim();
    var newScore = {
        userScore: score,
        initials: initials
    };

    var highscores = [];
    highscores.push(newScore);

    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html";
    
}

function checkForEnter(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

submitButton.onclick = saveHighScore;
beginButton.onclick = startQuiz;
initialsEl.onkeyup = checkForEnter;



//use localstorage getItem to get highscores and display for users
//use eventlistener in clear highscores
//onclick use key of high scores to clear out 
