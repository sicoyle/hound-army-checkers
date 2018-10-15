var lastClicked;

// Create an instance of the game board, and define in the function
// that gets called when any cell is clicked
var gameBoard = createBoard(function(el,row,col,i){
        console.log("You clicked on element:",el.id);
        console.log("You clicked on row:",row);
        console.log("You clicked on col:",col);
        console.log("You clicked on item #:",i);
        console.log("Cell value:",el.innerHTML);
        
        console.log(validatePiece(i));
                         
        el.className='clicked';
        if (lastClicked) lastClicked.className='';
        lastClicked = el;
    });

document.body.appendChild(gameBoard);


var tx = document.createElement("P");
tx.innerHTML = "Click me!";
tx.addEventListener("click",function(){
                    tx.innerHTML = "Thanks!";
                    });
tx.style.textAlign = 'center';
document.body.appendChild(tx);

// Initialize game board
var boardState = [
    ['','w','','w','','w','','w'],
    ['w','','w','','w','','w',''],
    ['','w','','w','','w','','w'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['b','','b','','b','','b',''],
    ['','b','','b','','b','','b'],
    ['b','','b','','b','','b','',]
    ];

drawBoard(boardState);


function createBoard( callback ){
    var i=0;
    var board = document.createElement('table');
    
    board.className = 'board';
    board.id = 'board';
    board.style.border = "thin solid #000";
    
    for (var r=0;r<8;++r){
        var tr = board.appendChild(document.createElement('tr'));
        
        for (var c=0;c<8;++c){
            var square = tr.appendChild(document.createElement('td'));
            
            square.id = ++i;
            square.style.width = "40px";
            square.style.height = "40px";
            square.style.textAlign = "center";
            square.style.color = "white";
            
            var data = square.appendChild(document.createTextNode(''));
            
            if(((c%2==0) && (r%2==1))||((c%2==1) && (r%2==0))) {
                square.style.backgroundColor = "black";
            }
            
            // attatch event listener to each square, which calls
            // a function that is defined when an instance of the
            // board is created
            square.addEventListener('click',(function(el,r,c,i){
                return function(){
                callback(el,r,c,i);
                }
            })(square,r,c,i),false);
        }
    }
    return board;
}


function drawBoard(state) {
    var board = document.getElementById("board");
    var a = 1;
    for(var i = 0,row; row = board.rows[i]; i++) {
        // go through rows
        for(var j = 0,col; col = row.cells[j]; j++) {
            // go through cells
            switch(state[i][j]) {
                    case 'w':
                        row.cells[j].innerHTML = 'w';
                        break;
                    case 'b':
                        row.cells[j].innerHTML = 'b';
                        break;
                    default:
                        row.cells[j].innerHTML = '';
                        break;
            }
            a++;
        }
    }
}

// Checks if the piece passed to the function
// is the player's piece
var validatePiece = function(el) {
    var selected = document.getElementById(el);
    // if they selected their piece, and it is not a king
    if(selected.innerHTML == 'b' || selected.innerHTML == 'B') {
        return true;
    }
    
    // if they selected a square that does not have their piece
    else {
        return false;
    }
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







