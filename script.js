const FLAG = "flag{dompac_is_done}";

let solved = {
c1:false,
c2:false,
c3:false,
c4:false
};

function checkFlag(challengeId){

const input = document.getElementById(challengeId).value.trim().toLowerCase();
const result = document.getElementById('r'+challengeId[1]);

if(input === FLAG){

result.textContent="✅ Correct!";
result.style.color="#22c55e";
solved[challengeId]=true;

}else{

result.textContent="❌ Incorrect. Try again!";
result.style.color="#f87171";
solved[challengeId]=false;

}

checkAllSolved();
}

function checkAllSolved(){

if(solved.c1 && solved.c2 && solved.c3 && solved.c4){

document.getElementById("congrats").style.display="block";

}else{

document.getElementById("congrats").style.display="none";

}

}
