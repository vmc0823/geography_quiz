//event listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

//global variables
var score = 0;
var attempts = Number(localStorage.getItem("total_attempts")) || 0;

displayQ4Choices();
displayQ6Choices();
displayQ7Choices();
displayQ9Choices();

//functions
function displayQ4Choices(){
	let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
	for (let i=0; i < q4ChoicesArray.length; i++) {
		document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}"
			value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}
            </label>`;
	}
}

function displayQ6Choices() {
  let q6ChoicesArray = ["Atlantic","Pacific","Indian","Arctic"];
  q6ChoicesArray = _.shuffle(q6ChoicesArray);
  for (let i = 0; i < q6ChoicesArray.length; i++) {
    const id = `q6-${q6ChoicesArray[i]}`;
    document.querySelector("#q6Choices").innerHTML +=
      `<div class="form-check text-start">
         <input class="form-check-input" type="radio" name="q6" id="${id}" value="${q6ChoicesArray[i]}">
         <label class="form-check-label" for="${id}">${q6ChoicesArray[i]}</label>
       </div>`;
  }
}

function displayQ7Choices() {
  let q7ChoicesArray = ["Atlantic","Pacific","Indian","Arctic"];
  q7ChoicesArray = _.shuffle(q7ChoicesArray);

  const c = document.querySelector("#q7Choices");
  c.innerHTML = "";
  for (let i = 0; i < q7ChoicesArray.length; i++) {
    const val = q7ChoicesArray[i];
    const id  = `q7-${val}`;

    // Bootstrap "btn-check" + label-as-button
    c.innerHTML += `
      <input type="radio" class="btn-check" name="q7" id="${id}" value="${val}" autocomplete="off">
      <label class="btn btn-outline-primary rounded-pill px-3" for="${id}">
        🌊 ${val}
      </label>
    `;
  }
}

function displayQ9Choices() {
  let q9ChoicesArray = ["Charlotte", "Raleigh", "Fayetteville", "Greensboro"]; 
  q9ChoicesArray = _.shuffle(q9ChoicesArray);

  const c = document.querySelector("#q9Choices");
  c.innerHTML = "";
  for (let i = 0; i < q9ChoicesArray.length; i++) {
    const val = q9ChoicesArray[i];
    const id  = `q9-${val.replace(/\s+/g,"")}`;

    c.innerHTML += `
  <label class="card shadow-sm rounded-4 p-3 border-0 quiz-card-option">
    <input type="radio" class="btn-check" name="q9" value="${val}" autocomplete="off">
    <div class="h4 mb-1">🏰 ${val}</div>
    <div class="text-muted small">Choose one</div>
  </label>
`;
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
 let q4Response = document.querySelector("input[name=q4]:checked")?.value || "";
 let q5Response = (document.querySelector("#q5").value || "").trim().toLowerCase();
 let q6Response = document.querySelector("input[name=q6]:checked")?.value || "";
 let q7Response = document.querySelector("input[name=q7]:checked")?.value || "";
 let q8Response = document.querySelector("#q8").value;
 let q9Response = document.querySelector("input[name=q9]:checked")?.value || "";
 console.log(q1Response);

 //checkboxes
  const q10Texas = document.querySelector("#Texas").checked;
  const q10Alaska = document.querySelector("#Alaska").checked;
  const q10PuertoRico = document.querySelector("#PuertoRico").checked;
  const q10Hawaii = document.querySelector("#Hawaii").checked;

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
    if (q5Response === "california") { 
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
    if (q8Response === "Wyoming") { 
    rightAnswer(8); 
    } else { 
    wrongAnswer(8); 
    }

    //NEW grading question 9
  if (q9Response.toLowerCase() === "raleigh") { 
    rightAnswer(9); 
  } else { 
    wrongAnswer(9); 
  }

  // NEW grading question 10
    if (q10Alaska && q10Hawaii && !q10PuertoRico && !q10Texas) {
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

