
var startButton = document.getElementById("start");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var image = document.getElementById("face");


const startGame = () => {
  const yearSelect = document.getElementById("year");
  const selectedYear = yearSelect.options[yearSelect.selectedIndex].value;
  sessionStorage.setItem("selectedYear", selectedYear);
  window.location.href = "quiz.html";
}


var studentData;
var answer;

const selectedYear = sessionStorage.getItem("selectedYear");
fetch(`data/students_${selectedYear}.json`)
  .then(response => response.json())
  .then(data => {
    studentData = data;
    console.log(data);
  })
  .then(() => {
    displayQuestion();
    console.log(answer);
  });



  
function selectRandomFour(){
  const shuffled = shuffle(studentData.slice());
  const randomFour = shuffled.slice(0,4);
  return randomFour;
}

function displayQuestion() {
  let currentQuestion = selectRandomFour();
  answer = currentQuestion[0].name;
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



buttonA.addEventListener("click", function(){
  if (buttonA.innerText == answer){
    displayQuestion()
  } else {
    alert("incorrect!")
  }
});

buttonB.addEventListener("click", function(){
  if (buttonB.innerText == answer){
    displayQuestion()
  } else {
    alert("incorrect!")
  }
});

buttonC.addEventListener("click", function(){
  if (buttonC.innerText == answer){
    displayQuestion()
  } else {
    alert("incorrect!")
  }
});

buttonD.addEventListener("click", function(){
  if (buttonD.innerText == answer){
    displayQuestion()
  } else {
    alert("incorrect!")
  }
});













