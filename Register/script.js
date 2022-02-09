var fname=document.getElementById("fname");
var lname=document.getElementById("lname");
var email=document.getElementById("email");
var password=document.getElementById("password");
var confirmPass=document.getElementById("confirmPass");
var emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var p=document.getElementsByClassName("validation");
var element = document.querySelector('form');
element.addEventListener('submit', event => {
  event.preventDefault();
});
function validate(){
    if(fname.value===''){
        p[0].textContent="*First Name Is Required"
        p[0].style.display="inline";
        return false;
     }else if(isFinite(fname.value)){
         p[0].textContent="First Name Must Be String"
         p[0].style.display="inline"; 
         return false;
     }
     else{
        p[0].style.display="none";
     }

    if(lname.value===''){
        p[1].textContent="Last Name Is Required"
         p[1].style.display="inline"; 
         return false;
     }else if(isFinite(lname.value)){
        p[1].textContent="Last Name Must Be String"
         p[1].style.display="inline";
         return false;
     }else{
         p[1].style.display="none";
     }

     if(email.value===""){
         p[2].textContent="E-mail Is Required"
         p[2].style.display="inline";
         return false;
     }else if(!emailRegx.test(email.value)){
        p[2].textContent="Enter Right E-mail Formate"
         p[2].style.display="inline";
         return false; 
     }else{
         p[2].style.display="none";
     }

     if(password.value===""){
         p[3].textContent="Password Is Required"
         p[3].style.display="inline";
         return false;
     }else if(password.value.length<8){
        p[3].textContent="Password Should be at least 8"
        p[3].style.display="inline";
        return false;
     }
     else{
        p[3].style.display="none";
    }

     if(confirmPass.value===""){
        p[4].textContent="Confirm Password Is Required"
         p[4].style.display="inline" ;
         return false;
     }else{
        p[4].style.display="none";
    }

     if(password.value!==confirmPass.value){
        p[4].textContent="Confirm Password not match password"
        p[4].style.display="inline"; 
        return false;
     }else{
        p[4].style.display="none";
    }
    return true;
}
function setCookie(key, value, date) {
    document.cookie = key + "=" + value + ";expires=" + date+"; path=/";
}
function validateClick(){
    if(validate()){
        window.location.replace("../Login/login.html")
        setCookie("FName",fname.value,new Date("2/2/2023"))
        setCookie("LName",lname.value,new Date("2/2/2023"))
        setCookie("email",email.value,new Date("2/2/2023"))
        setCookie("password",password.value,new Date("2/2/2023"))
    }
}
console.log(document.cookie)
