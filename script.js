const FLAG = "flag{dompac_is_done}";

let solved = {
c1:false,
c2:false,
c3:false,
c4:false
};

let score = 0;

function checkFlag(challengeId){

const input = document
.getElementById(challengeId)
.value
.trim()
.toLowerCase();

const result = document.getElementById("r"+challengeId[1]);

if(input === FLAG){

if(!solved[challengeId]){
score++;
}

result.textContent="✅ Correct!";
result.style.color="#22c55e";

solved[challengeId]=true;

document.getElementById(challengeId).disabled=true;

}else{

result.textContent="❌ Incorrect. Try again!";
result.style.color="#f87171";

solved[challengeId]=false;

}

document.getElementById("score").textContent=score;

checkAllSolved();
}

function checkAllSolved(){

if(solved.c1 && solved.c2 && solved.c3 && solved.c4){

document.getElementById("congrats").style.display="block";

setTimeout(() => {

window.location.href="https://turbo17.github.io/itc101-teamproj/htmlhackctf";

},5000);

}else{

document.getElementById("congrats").style.display="none";

}

}
