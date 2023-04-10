const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];  // Win condinitions of the game, if any of these arrays are the same letter then a winner is declared
let boxes = ["", "", "", "", "", "", "", "", ""]; //Array list of the values of each cell
let player = "X"; //starting player will always be player "X"

let playing = false;

initializeGame(); // starts the game

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked)); //gets informaiton from function CellClicked
    restartBtn.addEventListener("click", restartGame); // creates a restart button
    statusText.textContent = `${player}'s turn`;
    playing = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex"); 

    if(boxes[cellIndex] != "" || !playing){
        return;
    }

    updateCell(this, cellIndex); //updates the cell frontend
    checkWinner(); //Gets info from "checkWinner" function to see if win conditions are forfilled
}
function updateCell(cell, index){ //function that rewrites the array "boxes"
    boxes[index] = player;
    cell.textContent = player;
}



function changePlayer(){ //switches player each turn by checking the previous letter that was used
    player = (player == "X") ? "O" : "X";
    statusText.textContent = `${player}'s turn`;
       
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){ //For loop that goes through all possible win conditions
        const wincon= winConditions[i];
        if(boxes[wincon[0]] == "" || boxes[wincon[1]] == "" || boxes[wincon[2]] == ""){ //Tests to see if boxes are empty
            continue;
        }
        if(boxes[wincon[0]]==boxes[wincon[1]]&&boxes[wincon[1]]==boxes[wincon[2]]&&boxes[wincon[0]]!=""){ // tests to see if boxes values are equal to eachother and not equal to ""
            roundWon= true;
            break;
        }
        
      }
    
      
      if(roundWon){ 
        statusText.textContent = `${player} wins!`;
        playing = false;
      }
      else if(roundWon==false&&!boxes.includes("")){//Checks for a draw by testing to see if any boxes are empty and no win condition is met
        statusText.textContent = `Draw!`;
        playing = false;
    }
    else{
        changePlayer(); // if no win conditions are met and boxes are not all filled, then switch player
    }

}
    

function restartGame(){ // restarts game by reseting "boxes" elements to ""
        boxes = ["", "", "", "", "", "", "", "", ""];
    player = "X";
    statusText.textContent = `${player}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    playing = true;
}
