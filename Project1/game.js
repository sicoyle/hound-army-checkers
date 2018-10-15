var lastClicked;
var gameBoard = createBoard(8,8,function(el,row,col,i){
                            var selected = document.getElementById(i);
                         console.log("You clicked on element:",el.id);
                         console.log("You clicked on row:",row);
                         console.log("You clicked on col:",col);
                         console.log("You clicked on item #:",i);
                         console.log("Cell value",selected.innerHTML);
                         
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

//initialize game board
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

console.log(gameBoard);
drawBoard(boardState);
console.log(boardState);
console.log(gameBoard);

function createBoard( rows, cols, callback ){
    var i=0;
    var board = document.createElement('table');
    board.className = 'board';
    board.id = 'board';
    board.style.border = "thin solid #000";
    for (var r=0;r<rows;++r){
        var tr = board.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var square = tr.appendChild(document.createElement('td'));
            square.id = ++i;
            square.style.width = "40px";
            square.style.height = "40px";
            square.style.textAlign = "center";
            square.style.color = "white";
            var data = square.appendChild(document.createTextNode('adsf'));
            if(((c%2==0) && (r%2==1))||((c%2==1) && (r%2==0))) {
                square.style.backgroundColor = "black";
            }
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







