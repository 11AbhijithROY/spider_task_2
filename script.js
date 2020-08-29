var currentQuestion = 0;
var score = 0;
var totQuestions = questions.length;
var answer = [];
var seconds = 0;
var minutes = 5;
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
    //to remove a selected option that was not submitted from a previous test
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if(selectedOption) {
        selectedOption.checked = false;
    }

    loadbuttons();
    startscr.style.display = "none";
    container.style.display = "";
    startime = setInterval(timer,1000);
    loadQuestion(currentQuestion);
}
function loadQuestion (index) {
    if(index != totQuestions - 1) {
        nextButton.textContent = "Submit";
    }
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if(selectedOption) {
        console.log(selectedOption);
        selectedOption.checked = false;
        console.log('heyo');
    }
    //to load the question and options from questions.js
    currentQuestion = index;
    console.log(currentQuestion);
    if(typeof(index) != "string") {
        var q = questions[index];
        questionEl.textContent = (index + 1) + '. ' + q.question;
    }
    else {
        index = parseInt(index,10);
        var q = questions[index];
        questionEl.textContent = (index + 1) + '. ' + q.question;
    } 
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
}

function scoring () {
   
    for(let i = 0;i < totQuestions;i++){
            console.log('QNO. ' + (i+1) + 'ANS. ' + answer[i]);
            if(answer[i] == questions[i].answer && score <= 150) {
            score += 10;
        }
    }
    result.textContent = 'Hey ' + playername + '! Your Score is ' + score + '/150';
    result.style.display = "";
}
function loadbuttons () {
    //to choose any question
    var ques_btn;
    var ques_btncont = document.createElement("div");
    ques_btncont.setAttribute("class","ques_btncont");
        for(let i = 0;i < totQuestions;i++) {
        ques_btn = document.createElement("button");
        ques_btn.textContent = i+1;
        ques_btn.setAttribute("class","ques_btn");
        ques_btn.value = i;
        ques_btn.addEventListener("click", function(){
            var quesNO = this.value;
            //currentQuestion = quesNO;
            console.log('this is ' + this.value)
            loadQuestion(quesNO);
        })
        ques_btncont.appendChild(ques_btn);
    }
    container.appendChild(ques_btncont);
}
function submitQuestion () {
    //to make sure an option is selected before 'submit'
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if(!selectedOption){
        alert("PLEASE SELECT AN OPTION!");
        return;
    }

    //selected option is stored in answer array
    answer[currentQuestion] = selectedOption.value;
    console.log(selectedOption); 
    let buttons = document.querySelectorAll(".ques_btn")[currentQuestion];
    buttons.style.backgroundColor = "rgba(146, 41, 179, 0.384)";
    //returned to no selected option for the next question
    selectedOption.checked = false;
    currentQuestion++;
    if(currentQuestion == totQuestions - 1){
        nextButton.textContent = "Finish";
    }
    if(currentQuestion == totQuestions) {
        container.style.display = "none";
        //timer stopped when quiz is over
        seconds = 0;
        minutes = 0;
        return;
    }
    loadQuestion(currentQuestion);
}
/*function loadNextQuestion () {
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

/*function loadPrevQuestion () {
    var selectedOption = document.querySelector("input[type=radio]:checked");
    if(selectedOption){
    selectedOption.checked = false;
    }
    currentQuestion--;
    loadQuestion(currentQuestion);

}*/
