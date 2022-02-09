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

var email=document.getElementById("email");
var password=document.getElementById("password");
var emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var p=document.getElementsByClassName("validation");
var element = document.querySelector('form');
element.addEventListener('submit', event => {
  event.preventDefault();
});
function validate(){

     if(email.value===""){
         p[0].textContent="E-mail Is Required"
         p[0].style.display="inline";
         return false;
     }else if(!emailRegx.test(email.value)){
        p[0].textContent="Enter Right E-mail Formate"
         p[0].style.display="inline";
         return false; 
     }else if(getCookie("email")!==email.value){
        p[0].textContent="E-mail not correct"
        p[0].style.display="inline";
        return false;
     }
     else{
         p[0].style.display="none";
     }

     if(password.value===""){
         p[1].textContent="Password Is Required"
         p[1].style.display="inline";
         return false;
     }else if(password.value.length<8){
        p[1].textContent="Password Should be at least 8"
        p[1].style.display="inline";
        return false;
     }else if(getCookie("password")!==password.value){
        p[1].textContent="Password not correct"
        p[1].style.display="inline";
        return false;
     }
     else{
        p[1].style.display="none";
    }
    return true;
}

function validateClick(){
    if(validate()){
       window.location.replace("../Exam/exam.html")
    }
}

