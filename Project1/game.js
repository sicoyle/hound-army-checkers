//Create players
const PLAYER_1 = '⚪';
const PLAYER_2 = '⚫';

//initialize game board
var board = [
    ['','⚪','','⚪','','⚪','','⚪'],
    ['⚪','','⚪','','⚪','','⚪',''],
    ['','⚪','','⚪','','⚪','','⚪'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['⚫','','⚫','','⚫','','⚫',''],
    ['','⚫','','⚫','','⚫','','⚫'],
    ['⚫','','⚫','','⚫','','⚫','',]
];

const init = () => {
    drawBoard();
}

const drawBoard = () => {
    let ul = document.createElement("ul");
    let anchor = document.getElementById("board");
    let list = anchor.appendChild(ul);

    for(row in board) {
        console.log("On row: " + row);
        let li = document.createElement("li");
        let currentList = list.appendChild(li);

        for(piece in board[row]) {
            let DOMpiece = document.createElement("p");
            DOMpiece.id = [row,piece];
            console.log("Piece: " + piece);
            console.log(board[row], piece);
            
            switch(board[row][piece]) {
                case '⚫':
                    console.log("Black piece!");
                    DOMpiece.innerHTML = "[b]";
                    break;
                case '⚪':
                    console.log("White piece!");
                    DOMpiece.innerHTML = "[w]";
                    break;
                default:
                    console.log("Empty piece!");
                    DOMpiece.innerHTML = "[_]";
                    break;
            }

            currentList.appendChild(DOMpiece);
        }
    }
    console.log("done");
}

const moves = () => {
    movePieces();
}

const movePieces = () => {
    //Get piece coordinates clicked on

    
}

const musicToggle = () => {
    var myAudio = document.getElementById("myAudio");
    var isPlaying = false;

    togglePlay(isPlaying);
}

//Function to toggle playing of music
function togglePlay(isPlaying) {
  if (isPlaying) {
    myAudio.pause()
  } else {
    myAudio.play();
  }
};

//Functions to pause/play music
myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};