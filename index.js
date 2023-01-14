
window.onload = function() {
  viewportUnitsBuggyfill.init({
    force: true,
    refreshDebounceWait: 250
  });
};


var startButton = document.getElementById("start");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var image = document.getElementById("face");



const startGame = () => {
  const yearSelect = document.getElementById("year");
  const selectedYear = yearSelect.options[yearSelect.selectedIndex].value;

  const timeSelect = document.getElementById("time");
  const selectedTime = timeSelect.options[timeSelect.selectedIndex].value;

  sessionStorage.setItem("selectedYear", selectedYear);
  sessionStorage.setItem("selectedTime", selectedTime);
  window.location.href = "quiz.html";
}


var studentData;
var answer;

var correctStudentList = [];
var incorrectStudentList = [];

var correct = 0;
var incorrect = 0;

var canClick = true;

const selectedYear = sessionStorage.getItem("selectedYear");
const selectedTime = sessionStorage.getItem("selectedTime");

fetch(`data/students_${selectedYear}.json`)
  .then(response => response.json())
  .then(data => {
    studentData = data;
    console.log(data);
  })
  .then(() => {
    displayQuestion();
    console.log(answer);
  })
  .then(() => {
    startTimer(selectedTime);
  })


function startTimer(selectedTime){
  const time = document.querySelector(".time");
  let seconds = selectedTime;

  let timer = setInterval(() => {
    seconds -= 0.1;
    const remainingSeconds = (seconds % 60).toFixed(1);
    time.textContent = `Time: ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    if (remainingSeconds <= 0.0) {

        
        canClick = false;
        clearInterval(timer);
        time.textContent = "Time: 00:00"

        let numberCorrect = document.getElementById("num-correct");
        let numberIncorrect = document.getElementById("num-incorrect");

        numberCorrect.innerHTML = correct;
        numberIncorrect.innerHTML = incorrect;

        let scoreCard = document.getElementById("score-card");
        scoreCard.classList.toggle("hidden");

        let correctList = document.getElementById("correct-student-list");
        let incorrectList = document.getElementById("incorrect-student-list");

        for (var i = 0; i < correctStudentList.length; i++) {
          var item = document.createElement('li');
          item.appendChild(document.createTextNode(correctStudentList[i].name));

          var itemPic = new Image();
          itemPic.src = correctStudentList[i].image_path;
          
          correctList.appendChild(item);
          correctList.appendChild(itemPic);
        }

        for (var i = 0; i < incorrectStudentList.length; i++) {
          var item = document.createElement('li');
          item.appendChild(document.createTextNode(incorrectStudentList[i].name));

          var itemPic = new Image();
          itemPic.src = incorrectStudentList[i].image_path;

          incorrectList.appendChild(item);
          incorrectList.appendChild(itemPic);
        }
    }
}, 100);

}

function selectRandomFour(){
  const shuffled = shuffle(studentData.slice());
  const randomFour = shuffled.slice(0,4);
  return randomFour;
}

function displayQuestion() {
  let currentQuestion = selectRandomFour();
  student = currentQuestion[0];
  image.src = currentQuestion[0].image_path;
  currentQuestion = shuffle(currentQuestion);
  
  buttonA.innerHTML = currentQuestion[0].name;
  buttonB.innerHTML = currentQuestion[1].name;
  buttonC.innerHTML = currentQuestion[2].name;
  buttonD.innerHTML = currentQuestion[3].name;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayScore(){
  var correctText = document.getElementById("correct-score");
  var incorrectText = document.getElementById("incorrect-score"); 

  correctText.innerHTML = correct;
  incorrectText.innerHTML = incorrect;

}

function handleButtonAnswer(button){
  



  if (button.innerText == student.name){
    correct += 1;
    correctStudentList.push(student);
  } else {
    incorrect += 1;
    incorrectStudentList.push(student);
  }
  console.log(correctStudentList)
  console.log(incorrectStudentList)
}

buttonA.addEventListener("click", function(){
  if (!canClick) return;
  handleButtonAnswer(buttonA)
  displayQuestion()
  displayScore()
});

buttonB.addEventListener("click", function(){
  if (!canClick) return;
  handleButtonAnswer(buttonB)
  displayQuestion()
  displayScore()
});

buttonC.addEventListener("click", function(){
  if (!canClick) return;
  handleButtonAnswer(buttonC)
  displayQuestion()
  displayScore()
});

buttonD.addEventListener("click", function(){
  if (!canClick) return;
  handleButtonAnswer(buttonD)
  displayQuestion()
  displayScore()
});















