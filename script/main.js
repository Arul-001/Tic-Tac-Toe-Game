const boxes=document.querySelectorAll(".box");
const statusTxt=document.getElementById("status");
const btnRestart=document.getElementById("restart");
let x="<img src='../image/X.png'>";
let o="<img src='../image/O.png'>";
const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let options=["","","","","","","","",""];
let currentPlayer=x;
let player="X";
let running=false;
init();
function init(){
boxes.forEach(box=>box.addEventListener('click',boxClick));
btnRestart.addEventListener('click',restart);
statusTxt.textContent=player+' Your turn';
running=true;
} 

function boxClick(){
const index=this.dataset.index;
if(options[index]!="" || !running){
    return;
}
updateBox(this,index);
checkWinner()
}

function updateBox(box,index){
    options[index]=player;
    box.innerHTML=currentPlayer;
}

function changePlayer(){
player=(player=='X')?"O" :"X";
currentPlayer=(currentPlayer==x) ? o : x;
statusTxt.textContent=player+' Your turn';
}

function checkWinner(){
    isWon=false;
    for(let i=0;i<win.length;i++){
        const check=win[i];
        const box1=options[check[0]];
        const box2=options[check[1]];
        const box3=options[check[2]];
        if(box1=="" || box2=="" || box3=="")
            continue;
        if( box1==box2 && box2==box3){
            isWon=true;
            boxes[check[0]].classList.add('win');
            boxes[check[1]].classList.add('win');
            boxes[check[2]].classList.add('win'); 
        }
    }
    if(isWon){
        statusTxt.textContent=player+' Won the Match';
        running=false;
    }else if(!options.includes("")){
        statusTxt.textContent='Game Draw...';
        running=false;
    }else{
        changePlayer();
    }

}

function restart(){
    options=["","","","","","","","",""];
currentPlayer=x;
player="X";
running=true;
statusTxt.textContent=player+' Your turn';
boxes.forEach(box=>{
    box.innerHTML="";
    box.classList.remove("win");
})
}