function random(num) {
  return Math.floor(Math.random()*num)
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5)+5;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r-10},${g-10},${b-10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `
}

function createBalloons(num) {
  var balloonContainer = document.getElementById("balloon-container")
  for (var i = num; i > 0; i--) {
  var balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.style.cssText = getRandomStyles();           balloonContainer.append(balloon);
  }
}

window.onload = function() {
  createBalloons(100);
}
////////////////////////////////////
for (var i = 0; i < 150; i++) {
  create(i);
}

function create(i) {
  var width = Math.random() * 8;
  var height = width * 0.4;
  var colourIdx = Math.ceil(Math.random() * 3);
  var colour = "red";
  switch(colourIdx) {
    case 1:
      colour = "yellow";
      break;
    case 2:
      colour = "blue";
      break;
    default:
      colour = "red";
  }
  $('<div class="confetti-'+i+' '+colour+'"></div>').css({
    "width" : width+"px",
    "height" : height+"px",
    "top" : -Math.random()*20+"%",
    "left" : Math.random()*100+"%",
    "opacity" : Math.random()+0.5,
    "transform" : "rotate("+Math.random()*360+"deg)"
  }).appendTo('.wrapper');  
  
  drop(i);
}

function drop(x) {
  $('.confetti-'+x).animate({
    top: "100%",
    left: "+="+Math.random()*15+"%"
  }, Math.random()*2000 + 2000, function() {
    reset(x);
  });
}

function reset(x) {
  $('.confetti-'+x).animate({
    "top" : -Math.random()*20+"%",
    "left" : "-="+Math.random()*15+"%"
  }, 0, function() {
    drop(x);             
  });
}
/////////////////////////////
var grade=document.getElementById("grade");
var user_name=document.getElementById("user_name")
var header=document.getElementById("header");
var stdgrade=sessionStorage.getItem("grade");
var tryAgainbtn=document.getElementById("tryAgain");
if(stdgrade<=20){
  header.textContent="Sorry !"
user_name.textContent=getCookie("FName")+" "+getCookie("LName");
grade.textContent=" Your Grade Is: "+stdgrade+"/50";
header.style.color="red";
user_name.style.color="red";
grade.style.color="red";
tryAgainbtn.style.display="inline"
}else{
  header.textContent="Congratulations !"
  user_name.textContent=getCookie("FName")+" "+getCookie("LName");
  grade.textContent=" Your Grade Is: "+stdgrade+"/50"
}
function getCookie(key) {
    var res = "not found";
    var data = document.cookie;
    var arr = data.split("; ");
    arr.forEach(function (el) {
        var keyAndValue = el.split("=");
        if (keyAndValue[0] === key) {
            res = keyAndValue[1];
        }
  
    })
    return res;
  }