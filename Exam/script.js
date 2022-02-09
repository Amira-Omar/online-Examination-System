var bar_overlay=document.getElementById("bar");
var w = 0;
var foo = setInterval(function () {
    if(w>100){
        submit();
    }
    w = w + 0.20;
    bar_overlay.style.width = w + '%';
}, 300);
///////////////////////////////////////
function Question(id,Qbody,choices,Ranswer){
this.id=id
this.Qbody=Qbody;
this.choices=choices
this.Ranswer=Ranswer;
}
//////////////////////////////////////
function Answer(id,Abody){
    this.id=id;
    this.Abody=Abody;
}
///////////////////////////////
var A1 = new Answer(1, "document.write()")
var A2 = new Answer(2, "console.log()")
var A3 = new Answer(3, "window.alert()")
var A4 = new Answer(3, "All of the above")
var Q1_choices = [A1, A2, A3, A4]
var Q1 = new Question(1, "Which of the following methods can be used to display data in some form using Javascript?", Q1_choices, Q1_choices[3])


var A5 = new Answer(5, "Throws an error")
var A6 = new Answer(6, "Ignores the statement")
var A7 = new Answer(7, "Gives a warning")
var A8 = new Answer(8, "None of the above")
var Q2_choices = [A5, A6, A7, A8]
var Q2 = new Question(2,"Upon encountering empty statements, what does the Javascript Interpreter do?", Q2_choices, Q2_choices[1])


var A9 = new Answer(9, "getElementById()")
var A10 = new Answer(10, "getElementByClassName")
var A11 = new Answer(11, "Both A and B")
var Q3_choices = [A9, A10, A11, A8]
var Q3 = new Question(3, "Which of the following methods is used to access HTML elements using Javascript?", Q3_choices, Q3_choices[2])


var A12 = new Answer(12, "var")
var A13 = new Answer(13, "let")
var A14 = new Answer(14, "Both A and B")
var Q4_choices = [A12, A13, A14, A8]
var Q4 = new Question(4, "Which of the following keywords is used to define a variable in Javascript?", Q4_choices, Q4_choices[2])


var A15 = new Answer(15, "Object-Oriented")
var A16 = new Answer(16, "Object-Based")
var A17 = new Answer(17, "Procedural")
var Q5_choices = [A15, A16, A17, A8]
var Q5 = new Question(5, "Javascript is an _______ language?", Q5_choices, Q5_choices[1])

var arr  =  [Q1, Q2, Q3,Q4,Q5]
//////////////////////////////////
var Questions=[];
for (var i = 0; i < 5; i++) {
    var index = Math.floor((Math.random() * arr.length) + 1) - 1;
    Questions.push(arr[index]);
    arr.splice(index, 1);
}
////////////////////////////////
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
//////////////////////////////////
var question_count = 0;
window.onload = function () {
    displayQuestion(question_count);
    var fiveMinutes = 60 * 2.5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);

}
////////////////////////////////////
function  displayQuestion(num) {
    var question = document.getElementById("questions");
    var QN=document.getElementById("QN");
    var questionInArray = Questions[num];
    var QuestionOption = questionInArray.choices;

    var valueOption = []

    for (var i = 0; i < QuestionOption.length; i++) {
        valueOption.push(QuestionOption[i].Abody)
    }

    var [first, second, third, fourth] = valueOption;
    question.innerHTML = `
        <h2>Q${num + 1}. ${Questions[num].Qbody}</h2>
        <ul class="option_group">
        <li class="option">${first}</li>
        <li class="option">${second}</li>
        <li class="option">${third}</li>
        <li class="option">${fourth}</li>
    </ul> 
        `;
        QN.textContent=num+1;
        switchActive();
}
///////////////////////////////////
function switchActive() {
    var option = document.querySelectorAll("li.option");
    for (let i = 0; i < option.length; i++) {
        option[i].onclick = function () {
            for (let i = 0; i < option.length; i++) {
                if (option[i].classList.contains("active")) {
                    option[i].classList.remove("active");
                }
            }
            option[i].classList.add("active");
            stdAnswer();
        };
    }

}
/////////////////////////////////////////


function next(){
    if (question_count < Questions.length - 1) {
        question_count++;
        displayQuestion(question_count)
    }
    if (question_count == Questions.length - 1) {
        var btn_submit = document.getElementById("submitData")
        btn_submit.style.display = "inline"

    }
    saveActive(question_count);
}
////////////////////////////
function previous(){
    if (question_count > 0) {
        question_count--;
        displayQuestion(question_count)
        var btn_submit = document.getElementById("submitData")
        btn_submit.style.display = "none"

    }
    saveActive(question_count);
    
}

////////////////////////////////////////

function submit(){
    var grade = checkAnswer();
    sessionStorage.setItem("grade", grade);
    clearInterval(foo);
    location.replace("../animation/index.html");
    console.log(studentAnswers)
}

function checkAnswer() {
    let points = 0;
    for (var i = 0; i < studentAnswers.length; i++) {
        for (var j = 0; j < Questions.length; j++) {
            if (studentAnswers[i].QId == Questions[j].id) {
                if (studentAnswers[i].user_answer == Questions[j].Ranswer.Abody) {
                    points += 10;
                }
            }
        }
    }
    return points;

}
function mark() {
    if (question_count < Questions.length) {
        var markDiv = document.getElementById("markedQ")
        var marDivChild = markDiv.children;

        if (marDivChild.length == 0) {
            var div = document.createElement('div');
            div.id = Questions[question_count].id;
            div.className = "markDiv1";
            div.innerHTML = "Question" + (question_count + 1) + ") ";

            div.onclick = function () {

                for (var i=0;i<Questions.length;i++){
                    if(Questions[i].id == this.getAttribute("id")){
                        question_count = i;
                    }
                }
                displayQuestion(question_count)
                var btn_submit = document.getElementById("submitData")
                btn_submit.style.display = "none"

                for (var i=0;i<Questions.length;i++){
                    if(Questions[Questions.length-1].id == this.getAttribute("id")){
                        btn_submit.style.display = "inline-block"                    }
                }

                saveActive(question_count);
                this.remove()
            }
            markDiv.appendChild(div)

        } else {
            var idNotFound = false;
            for (var i = 0; i < marDivChild.length; i++) {
                var marDivChildId = marDivChild[i].getAttribute("id")
                if (Questions[question_count].id == marDivChildId) {
                    idNotFound = true;
                }

            }
            if (!idNotFound) {
                var div = document.createElement('div');
                div.id = Questions[question_count].id;
                div.className = "markDiv1";
                div.innerHTML = "Question" + (question_count + 1) + ") " 
                
                div.onclick = function () {
                    for (var i=0;i<Questions.length;i++){
                        if(Questions[i].id == this.getAttribute("id")){
                            question_count = i;
                        }
                    }
                    displayQuestion(question_count)
                    var btn_submit = document.getElementById("submitData")
                    btn_submit.style.display = "none"

                    for (var i=0;i<Questions.length;i++){
                        if(Questions[Questions.length-1].id == this.getAttribute("id")){
                            btn_submit.style.display = "inline-block"                   
                         }
                    }
                    saveActive(question_count);
                    this.remove();
                }
                markDiv.appendChild(div)
            }

        }
    }
}

var studentAnswers= [];
function stdAnswer() {
    var option = document.querySelectorAll("li.option");
    for (let i = 0; i < option.length; i++) {
        if (option[i].classList.contains("active")) {
            var user_answer = document.querySelector("li.option.active").innerHTML;
            var QId = Questions[question_count].id;
            if (studentAnswers.length == 0) {
                studentAnswers.push({ QId, user_answer });
            } else {
                var IdEqual = false;
                for (var j = 0; j < studentAnswers.length; j++) {
                    if (studentAnswers[j].QId == QId) {
                        studentAnswers.splice(j, 1)
                        studentAnswers.push({ QId, user_answer });
                        IdEqual = true;
                    }
                }
                if (!IdEqual) {
                    studentAnswers.push({ QId, user_answer });
                }

            }
        }

    }

}

function saveActive(question_count) {
    var option = document.querySelectorAll("li.option");
    for (let i = 0; i < option.length; i++) {
        for (let j = 0; j < studentAnswers.length; j++) {
            if (option[i].innerHTML == studentAnswers[j].user_answer && studentAnswers[j].QId == Questions[question_count].id) {
                option[i].classList.add("active");
            }
        }
    }
}