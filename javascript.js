var timeLeft = 75;
var timerItv;
var Points = 0;
var correct;
// connect all elements from html to javascript.
var beginQuizBody = document.getElementById('quiz-content');
var Quizquestion = document.getElementById('quizQuestion');
var beginQuizdiv = document.getElementById('beginQuiz');
var beginButton = document.getElementById('startbutton');
var endgamediv = document.getElementById('endgame');
var QuiztimeLimit = document.getElementById('timer');
var HSinputName = document.getElementById('INT');
var submitButton = document.getElementById('scoreSubmit');
var RecordedscoreCont = document.getElementById('recordedscore-Container');
var scoreListPage = document.getElementById('scoreListPage');
var UserInitial = document.getElementById('user-initial');
var userScore = document.getElementById('user-score');
var resultscore = document.getElementById('resultscore');
var endgameBtns = document.getElementById('endgameButton');
// Answer Button
var OptionA = document.getElementById('a');
var OptionB = document.getElementById('b');
var OptionC = document.getElementById('c');
var OptionD = document.getElementById('d');

// Quiz question List
// Quiz question object
var quizQuestionsList = [{
    question: "what command used to push files to github?",
    choiceA: "git checkout",
    choiceB: "git add",
    choiceC: "git push",
    choiceD: "git commit",
    correctAnswer: "c"},
  {
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
   {
    question: "What langague used to style a website?",
    choiceA: "C++",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"},
    {
    question: "Is it necessary for the external script file to contain a <script> tag?",
    choiceA: "Yes",
    choiceB: "No",
    choiceC: "Depends on the type of include",
    choiceD: "none of the above",
    correctAnswer: "b"},
    {
    question: "When will Local Storage cleared??",
    choiceA: "Not expired",
    choiceB: "When reload page",
    choiceC: "Restart computer",
    choiceD: "new page loaded",
    correctAnswer: "a"},  
    {
    question: "what is the method .length is for?",
    choiceA: "extend the length of the string",
    choiceB: "measure the string length",
    choiceC: "Count numbers of the arrays",
    choiceD: "None of the above",
    correctAnswer: "c"},
    {
    question: "We can delcare variables in how many ways?",
    choiceA: "Only one",
    choiceB: "Three",
    choiceC: "Infinitely many",
    choiceD: "None",
    correctAnswer: "b"},
    {
    question: "Inside which HTML element do we put the JavaScript?",
    choiceA: `javascript`,
    choiceB: `js`,
    choiceC: `src`,
    choiceD: `script`,
    correctAnswer: "d"}, 
        
    
    ];

// Questions, timer, score variables 
var QuestionListIndex = quizQuestionsList.length;
var currentQuestionList = 0;


// create function that will generate questions
function QuizGenerator(){
    endgamediv.style.display = "none";
    if (currentQuestionList === QuestionListIndex){
        return showPoints();
    }
    var currentItem = quizQuestionsList[currentQuestionList];
    Quizquestion.innerHTML = "<p>" + currentItem.question + "</p>";
    OptionA.innerHTML = currentItem.choiceA;
    OptionB.innerHTML = currentItem.choiceB;
    OptionC.innerHTML = currentItem.choiceC;
    OptionD.innerHTML = currentItem.choiceD;
    
};
// function to start the quiz, time interval trigger, hide start button and display first quiz question

function Beginquiz() {
    endgamediv.style.display = "none";
    beginQuizdiv.style.display = "none";
    QuizGenerator();

    // Timer function
    timerItv = setInterval(function(){
        timeLeft--;
        QuiztimeLimit.textContent = 'Time Left: ' + timeLeft ;
        if(timeLeft === 0) {
            clearInterval(timerItv);
            showPoints();
        }
    },1000);
    beginQuizBody.style.display = "block";

}
// Showpoints function 
function showPoints(){
    beginQuizBody.style.display = "none";
    endgamediv.style.display = "flex";
    clearInterval(timerItv);
    HSinputName.value = "";
    resultscore.innerHTML = " You got " +  Points + " out of " + quizQuestionsList.length + " correct!";

}
// add event listenser to submit function.
// save user initial and score into local storage.
submitButton.addEventListener("click", function topScore(){
    if(HSinputName.value === ""){
        alert('please put your initials here');
        return false;
    } else {
        var Highscores = JSON.parse(localStorage.getItem("Highscores")) || [];
        var currentuser = HSinputName.value.trim();
        var currentscore = {
            name : currentuser,
            Points : Points
        };
        endgamediv.style.display = "none";
        RecordedscoreCont.style.display = "flex";
        scoreListPage.style.display = "block";
        endgameBtns.style.display = "flex";

        Highscores.push(currentscore);
        localStorage.setItem("Highscores", JSON.stringify(Highscores));
        getHighscores();
    }
});
// clear the questions for highscore and generate new highscores from local storage
function getHighscores() {
    UserInitial.innerHTML = "";
    userScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("Highscores")) || [];
    for (i=0; i<highscores.length; i++) {
        var newUserName = document.createElement("li");
        var newUserScore =  document.createElement("li");
        newUserName.textContent = highscores[i].name;
        newUserScore.textContent = highscores[i].Points;
        UserInitial.appendChild(newUserName);
        userScore.appendChild(newUserScore);
    }
}

// function that display the highscores page
function checkBestscore() {
    beginQuizdiv.style.display = "none";
    endgamediv.style.display = "none";
    RecordedscoreCont.style.display = "flex";
    userScore.style.display = 'block';
    endgameBtns.style.display = "flex";
    getHighscores();

};
// function that clear score
function ClearScore(){
    window.localStorage.clear();
    UserInitial.textContent = "";
    userScore.textContent = "";
};
// function that reply quiz
function RetryQuiz() {
    RecordedscoreCont.style.display = 'none'
    endgamediv.style.display = "";
    beginQuizdiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionList = 0;

};
// function that checks the response to each answer
function verifyAnswer(solution) {
    correct = quizQuestionsList[currentQuestionList].correctAnswer;
    if (solution === correct && currentQuestionList !== QuestionListIndex ) {
        Points++;
        alert("Answer correct.")
        currentQuestionList++;
        QuizGenerator();
        // display in the results div that the answer is correct.
    } else if (solution !== correct && currentQuestionList !== QuestionListIndex){
        alert('Answer incorrect');
        currentQuestionList++;
        QuizGenerator();
    } else{
        getHighscores();
    }
}














// start quiz button
beginButton.addEventListener("click",Beginquiz);





