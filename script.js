var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;
var answer = [];

var startscr = document.querySelector(".startscr");
var container = document.querySelector(".quizContainer");
var questionEl = document.querySelector(".question");
var opt1 = document.querySelector(".option1");
var opt2 = document.querySelector(".option2");
var opt3 = document.querySelector(".option3");
var nextButton = document.querySelector(".nextButton");
var prevButton = document.querySelector(".prevButton");
var result = document.querySelector(".result");

function loadQuiz() {
    startscr.style.display = "none";
    container.style.display = "";
    loadQuestion(currentQuestion);
}
function loadQuestion (index) {
    if(index == 0){
        prevButton.style.display = "none";
    }
    else 
        prevButton.style.display = "";
    var q = questions[index];
    questionEl.textContent = (index + 1) + '. ' + q.question; 
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    
}
function scoring () {
    for(let i = 0;i < totQuestions;i++){
        if(answer[i] == questions[i].answer) {
            score += 10;
        }
    }
}
function loadNextQuestion () {
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if(!selectedOption){
        alert("PLEASE SELECT AN OPTION!");
        return;
    }
    answer[currentQuestion] = selectedOption.value;

    selectedOption.checked = false;
    currentQuestion++;
    if(currentQuestion == totQuestions -1){
        nextButton.textContent = "Finish";
    }
    if(currentQuestion == totQuestions) {
        container.style.display = "none";
        scoring();
        result.style.display = "";
        result.textContent = 'Your Score is ' + score;
        return;
    }
    loadQuestion(currentQuestion);
}

function loadPrevQuestion () {
    currentQuestion--;
    loadQuestion(currentQuestion);
}
