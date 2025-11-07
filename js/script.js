//event listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

//global variables
var score = 0;
var attempts = Number(localStorage.getItem("total_attempts")) || 0;

displayQ4Choices();
displayQ6Choices();
displayQ7Choices();

//functions
function displayQ4Choices(){
	let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
	for (let i=0; i < q4ChoicesArray.length; i++) {
		document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}"
			value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}
            </label>`;
	}
}

function displayQ6Choices() {
  let q6ChoicesArray = ["Atlantic", "Pacific", "Indian", "Arctic"]; // correct = Pacific
  q6ChoicesArray = _.shuffle(q6ChoicesArray);
  for (let i = 0; i < q6ChoicesArray.length; i++) {
    document.querySelector("#q6Choices").innerHTML +=
      ` <input type="radio" name="q6" id="${q6ChoicesArray[i]}"
          value="${q6ChoicesArray[i]}"> 
        <label for="${q6ChoicesArray[i]}">${q6ChoicesArray[i]}</label>`;
  }
}

function displayQ7Choices() {
  let q7ChoicesArray = ["Atlantic", "Pacific", "Indian", "Arctic"]; // correct = Atlantic
  q7ChoicesArray = _.shuffle(q7ChoicesArray);
  for (let i = 0; i < q7ChoicesArray.length; i++) {
    const id = q7ChoicesArray[i] + "-east"; //avoid id conflicts with q6
    document.querySelector("#q7Choices").innerHTML +=
      ` <input type="radio" name="q7" id="${q7ChoicesArray[i]}-east"
          value="${q7ChoicesArray[i]}"> 
        <label for="${q7ChoicesArray[i]}-east">${q7ChoicesArray[i]}</label>`;
  }
}

function isFormValid(){
    let isValid= true;
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    } 
    return isValid;
    }//isFormValid

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='checkmark'>";
    score += 20;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz(){
 console.log("Grading quiz…");
 document.querySelector("#validationFdbk").innerHTML = "";
 document.querySelector("#congratsMsg").innerHTML = "";
 if (!isFormValid()) {
    return;
 }

 //variable
 score = 0;
 let q1Response = document.querySelector("#q1").value.toLowerCase();;
 let q2Response = document.querySelector("#q2").value;
 let q4Response = document.querySelector("input[name=q4]:checked").value || "";
 let q5Response = (document.querySelector("#q5").value || "").trim().toLowerCase();
 let q6Response = document.querySelector("input[name=q6]:checked")?.value || "";
 let q7Response = document.querySelector("input[name=q7]:checked")?.value || "";
 let q8Response = document.querySelector("#q8").value;
 let q9Response = (document.querySelector("#q9").value || "").trim().toLowerCase();
 console.log(q1Response);

 //checkboxes
   const q10Chile = document.querySelector("#Chile").checked;
  const q10Colombia = document.querySelector("#Colombia").checked;
  const q10CostaRica = document.querySelector("#CostaRica").checked;
  const q10Cuba = document.querySelector("#Cuba").checked;

 //Grading question 1
    if (q1Response == "sacramento") {
	    rightAnswer(1);
	}
	else {
	    wrongAnswer(1);
	}

//Grading question 2
	if (q2Response == "mo") {
	    rightAnswer(2);
	}
	else {
		wrongAnswer(2);
	}	

//Grading question 3
	if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked &&
    !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
			rightAnswer(3);
	}
	else {
			wrongAnswer(3);
	}

//Grading question 4
	if (q4Response == "Rhode Island") {
		rightAnswer(4);
	}
	else {
		wrongAnswer(4);
	}

// NEW grading question 5
    if (q5Response === "china") { 
    rightAnswer(5); 
    } else { 
    wrongAnswer(5); 
    }

  // NEW grading question 6
    if (q6Response === "Pacific") { 
    rightAnswer(6); 
    } else { 
    wrongAnswer(6); 
    }

  // NEW grading question 7
    if (q7Response === "Atlantic") { 
    rightAnswer(7); 
    } else { 
        wrongAnswer(7); 
    }

  // NEW grading question 8
    if (q8Response === "Vatican City") { 
    rightAnswer(8); 
    } else { 
    wrongAnswer(8); 
    }

  // NEW grading question 9
    if (q9Response === "madrid") { 
    rightAnswer(9); 
    } else { 
        wrongAnswer(9); 
    }

  // NEW grading question 10
    if (q10Chile && q10Colombia && !q10CostaRica && !q10Cuba) {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

  const maxRaw = 200; // 10 questions * 20 points each
  const finalScore = Math.round((score / maxRaw) * 100);

  const scoreEl = document.querySelector("#totalScore");
  scoreEl.classList.remove("text-success", "text-danger");
  scoreEl.classList.add(finalScore < 80 ? "text-danger" : "text-success");
  scoreEl.innerHTML = `Total Score: ${finalScore}/100`;

  if (finalScore > 80) {
    document.querySelector("#congratsMsg").innerHTML = "🎉 Great job! You scored above 80!";
    }
	
  document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
  localStorage.setItem("total_attempts", attempts);

}

