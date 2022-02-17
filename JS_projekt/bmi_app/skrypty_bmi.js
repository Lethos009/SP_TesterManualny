function isInRange(value, min, max) {
  if (value >= min && value <= max) return 1;
  return 0;
}

let counter = 0;
let history = [];
let bmi = 0;
let statementArray = [];

function getValueInput() {
  let bmiCache =[];
  let height = document. querySelector('#inputHeight');
  let weight = document. querySelector('#inputWeight');
  let heightVal = parseInt(height.value);
  let weightVal = parseInt(weight.value);

  /* Sprawdzenie czy wpisane wartosci mieszcza sie dopuszczalnym zakresie */
  let checkHeight = isInRange(heightVal, 120, 240);
  let checkWeigth = isInRange(weightVal, 40, 200);
 
  
  /* Pobranie daty i czasu systemowego */
  let today = new Date();
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date +' '+ time;

    if (checkHeight !== 0 && checkWeigth !== 0) {
      /* Wypisanie danych w module wynikow */
      document.querySelector("#Height").innerHTML = heightVal;
      document.querySelector("#Weight").innerHTML = weightVal;
      document.querySelector(".statement").innerHTML ="";

      /* Obliczenie BMI i wyswietlenie na stronie */
      bmi = (weightVal / ((heightVal/100)**2)).toFixed(2);
      document.querySelector("#resultBmi").innerHTML = bmi

      /* Zapisywanie i wepchniecie tabeli z danymi do ogolnej tabeli historii */
      bmiCache[0] = counter + 1;
      bmiCache[1] = bmi;
      bmiCache[2] = heightVal;
      bmiCache[3] = weightVal;
      bmiCache[4] = dateTime;
      history.push(bmiCache);

      // console.log(bmiCache);
      // console.log(history[counter]);

      /* Wypisywanie historii wynikow */
      document.querySelector("#bmiHistory").innerHTML = document.querySelector("#bmiHistory").innerHTML + "<div> Pomiar " + history[counter][0] + ", BMI: " + "<strong>" + history[counter][1] + "</strong> (" + history[counter][2] + " cm, " + history[counter][3] + " kg), <br> wykonano: " +  history[counter][4] +"</div>";

      bmiStatement();
      
      counter++;

    } else { 
      if (checkWeigth !== 0 && checkHeight === 0) {
        document.querySelector(".statement").innerHTML = "<br>Wartość wzrostu (" + heightVal + ") jest niepoprawna!"
      } else { if (checkWeigth === 0 && checkHeight === 0) {
        document.querySelector(".statement").innerHTML = "<br>Obie wartości (" + heightVal + ", " + weightVal + ") są niepoprawne!"
      } else {
        document.querySelector(".statement").innerHTML = "<br>Wartość wagi (" + weightVal + ") jest niepoprawna!"
      }
    } 
  }

  /* Wyczyszczenie inputow */
  document.querySelector('#inputHeight').value = "";
  document.querySelector('#inputWeight').value = "";

}

/* Wyswielenie komunikatu o zwiekszeniu lub zmniejszeniu bmi */
function bmiStatement() {
  let currentBmi = history[counter][1];
  statementArray.push(currentBmi);

  if (statementArray.length >= 2 && statementArray[counter - 1] > statementArray[counter]) {
    document.querySelector(".statementBmi").innerHTML = "<strong>Twoje BMI spadło!</strong>"
  } else { 
    if (statementArray.length >= 2 && statementArray[counter - 1] < statementArray[counter]) {
      document.querySelector(".statementBmi").innerHTML = "<strong>Twoje BMI wzrosło!</strong>"
    } else {
      if (statementArray.length < 2 && statementArray[counter - 1] > statementArray[counter]) {
        return ; 
      } else {
        document.querySelector(".statementBmi").innerHTML = "<strong>Twoje BMI jest stałe.</strong>"
      }
    }
  }
  // console.log(statementArray);
  // console.log(counter);
  // console.log(statementArray.length);
}

function clearHistory() {
  document.querySelector("#bmiHistory").innerHTML = "";
  document.querySelector("#Height").innerHTML = "0";
  document.querySelector("#Weight").innerHTML = "0";
  document.querySelector("#resultBmi").innerHTML ="0";
  document.querySelector(".statement").innerHTML ="";
  document.querySelector(".statementBmi").innerHTML = "";

  history = [];
  bmiCache = [];
  statementArray = [];
  counter = 0;
}

function darkMode() {
  let body = document.body;
  body.classList.toggle("dark");
  }