var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;

var container = document.querySelector(".quizContainer");
var questionEl = document.querySelector(".question");
var opt1 = document.querySelector(".option1");
var opt2 = document.querySelector(".option2");
var opt3 = document.querySelector(".option3");

var nextButton = document.querySelector(".nextButton");
var result = document.querySelector(".result");

function loadQuestion (index) {
    var q = questions[index];
    questionEl.textContent = (index + 1) + '. ' + q.question; 
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    
}

function loadNextQuestion () {
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if(!selectedOption){
        alert("PLEASE SELECT AN OPTION!");
        return;
    }
    console.log(score);
    var answer = selectedOption.value;
    if(questions[currentQuestion].answer == answer)
    {
        score += 10;
        console.log(score);
    }
    selectedOption.checked = false;
    currentQuestion++;
    if(currentQuestion == totQuestions -1){
        nextButton.textContent = "Finish";
    }
    if(currentQuestion == totQuestions) {
        container.style.display = "none";
        result.style.display = "";
        result.textContent = 'Your Score is ' + score;
        return;
    }
    loadQuestion(currentQuestion);
}

loadQuestion(currentQuestion);