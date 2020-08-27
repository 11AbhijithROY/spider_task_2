var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;
var answer = [];
var seconds = 0;
var minutes = 2;
var starttime;
//var wrongans = [];

var startscr = document.querySelector(".startscr");
var playername = document.querySelector(".inputname").value;
var container = document.querySelector(".quizContainer");
var questionEl = document.querySelector(".question");
var opt1 = document.querySelector(".option1");
var opt2 = document.querySelector(".option2");
var opt3 = document.querySelector(".option3");
var nextButton = document.querySelector(".nextButton");
var prevButton = document.querySelector(".prevButton");
var result = document.querySelector(".result");
var timecont = document.querySelector(".timebar");

function timer() {
    if(seconds == 0) {
        seconds = 59;
        if(minutes != 0){
        minutes -= 1;
        }
        else {
            clearInterval(startime);
            timecont.style.display = "none";
            container.style.display = "none";
            scoring();
        }
    }
    else {
        seconds -= 1;
    }
    timecont.textContent = minutes + '.' + seconds;
}

function loadQuiz() {
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if(selectedOption) {
        selectedOption.checked = false;
    }
    startscr.style.display = "none";
    container.style.display = "";
    startime = setInterval(timer,1000);
    loadQuestion(currentQuestion);
}
function loadQuestion (index) {
    if(index != totQuestions - 1) {
        nextButton.textContent = "Next";
    }
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
        if(answer[i] == questions[i].answer && score <= 150) {
            score += 10;
            
        }
    }
    result.textContent = 'Hey ' + playername + '! Your Score is ' + score + '/150';
    result.style.display = "";
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
    if(currentQuestion == totQuestions - 1){
        nextButton.textContent = "Finish";
    }
    if(currentQuestion == totQuestions) {
        container.style.display = "none";
        seconds = 0;
        minutes = 0;
        return;
    }
    loadQuestion(currentQuestion);
}

function loadPrevQuestion () {
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if(selectedOption){
    selectedOption.checked = false;
    }
    currentQuestion--;
    loadQuestion(currentQuestion);

}
