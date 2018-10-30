const PLAYER_1='black';
const PLAYER_2='white';
var currentPlayer=PLAYER_1;
var opponentPlayer=PLAYER_2;
var bias=1;
var requestedPiece;
var coords;
var selectedPiece;
var prevSelectedPiece = [];
var isJump = false;
var isValid;
var highlightedSquares = new Set();
var player1Score = 0;
var player2Score = 0;
var sc1=0;
var sc2=0;

const world = [
    ['x','black','x','black','x','black','x','black'],
    ['black','x','black','x','black','x','black','x'],
    ['x','black','x','black','x','black','x','black'],
    ['','x','','x','','x','','x'],
    ['x','','x','','x','','x',''],
    ['white','x','white','x','white','x','white','x'],
    ['x','white','x','white','x','white','x','white'],
    ['white','x','white','x','white','x','white','x']
];

var w;

const drawWorld = () => {
    console.log("Drawing world...");
    //let ul = document.createElement("ul");
    let table = document.createElement("table");
    let anchor = document.getElementById("world");
    //let list = anchor.appendChild(ul);
    let board = anchor.appendChild(table);
    for(row in world) {
        console.log("On row: " + row);
        //let li = document.createElement("li");
        let ri = document.createElement('tr');
        //let currentList = list.appendChild(li);
        let currentBoard = board.appendChild(ri);
        for(column in world[row]) {
            //let DOMpiece = document.createElement("p");
            let DOMpiece = document.createElement("td");
            DOMpiece.id = [row,column];
            DOMpiece.style.width = "45px";
            DOMpiece.style.height = "45px";
            DOMpiece.style.textAlign = "center";
            console.log("Piece: " + column);
            console.log(world[row][column]);
            switch(world[row][column]){
                case 'white':
                    console.log("White piece!");
                    //DOMpiece.innerHTML = "[w]";
                    DOMpiece.innerHTML = '&#9898';
                    DOMpiece.style.background = "dimgray";
                    break;
                case 'black':
                    console.log("Black piece!");
                    //DOMpiece.innerHTML = "[b]";
                    DOMpiece.innerHTML = '&#9899';
                    DOMpiece.style.background = "dimgray";
                    break;
                case 'x':
                    console.log("Illegal space!");
                    DOMpiece.innerHTML = '';
                    DOMpiece.style.background = '#e0f5ea';
                    break;
                default:
                    console.log("empty piece!");
                    DOMpiece.innerHTML = '';
                    DOMpiece.style.background = "dimgray";
                    break;
            }
            //currentList.appendChild(DOMpiece);
            currentBoard.appendChild(DOMpiece);
        }
    }

    console.log("Donezo");
    return anchor;
};

const logError = (err) => console.error(err);

// isSelectableChecker  takes row and column value and returns if current player location matches coordinates on board AND
// there is at least one available space to move.
//const isSelectableChecker = (row,col) => { return (world[row][col] === currentPlayer) ? true : false;};
const isSelectableChecker = (row,col) => {
    let correctPlayer = (world[row][col] === currentPlayer);
    //let rightNotSelf = ((world[+row+bias][+col-1] === currentPlayer) && (world[+row+bias][+col+1] === '')); //!==
    //currentPlayer));
    //let leftNotSelf = ((world[+row+bias][+col-1] !== currentPlayer) && (world[+row+bias][+col+1] === ''));
    //currentPlayer));
    let rightNotSelf = (world[+row+bias][+col+1] !== currentPlayer);
    let leftNotSelf = (world[+row+bias][+col-1] !== currentPlayer);

    let leftOnBoard = ((world[+row+bias][+col-1] === '') || (world[+row+bias][+col-1] === opponentPlayer));
    let rightOnBoard = ((world[+row+bias][+col+1] ==='') || (world[+row+bias][+col+1] === opponentPlayer));

    return correctPlayer && (rightNotSelf || leftNotSelf) && (leftOnBoard || rightOnBoard);};

/*
 return ((world[row][col] === currentPlayer) &&
 (((world[+row+bias][+col-1] === currentPlayer) && (world[+row+bias][+col+1] !==
 currentPlayer)) || ((world[+row+bias][+col-1] !== currentPlayer) && (world[+row+bias][+col+1] ===
 currentPlayer))) && (((world[+row+bias][+col-1] === '') || (world[+row+bias][+col+1]) === ''))) ;};
 */

const selectPiece = (e) => {
    requestedPiece = e.target;
    coords = requestedPiece.id;
    console.log("requestedPiece: ", requestedPiece, "; coords: ", coords);
    let row = coords[0];
    let col = coords[2];
    console.log("world piece: [%s,%s] === %s", row, col, world[row][col]);

    if(isSelectableChecker(row,col)) {
        selectedPiece = requestedPiece;
        document.getElementById('actor').innerHTML = selectedPiece.id;
        let leftpossible;
        let rightpossible;
        let leftnode;
        let rightnode;
        if ((+row + bias) !== null) {
            if ((+col - 1) !== null) {
                leftpossible = (+row + bias) + ',' + (+col - 1);
                leftnode = document.getElementById(leftpossible);
                if((world[+row+bias][+col-1] !== currentPlayer) && (world[+row+bias][+col-1] !== opponentPlayer)) {
                    highlightedSquares.add(leftnode);
                }
                // Implement left jump highlighting
                // WHITE
                if((world[+row+bias][+col-1] === opponentPlayer) && (world[+row+bias-1][+col-2] ==='') && (opponentPlayer === PLAYER_1)){
                    leftpossible = (+row+bias-1) + ',' + (+col-2);
                    leftnode = document.getElementById(leftpossible);
                    highlightedSquares.add(leftnode);
                }
                // BLACK
                if((world[+row+bias][+col-1] === opponentPlayer) && (world[+row+bias+1][+col-2] ==='') && (opponentPlayer === PLAYER_2)){
                    leftpossible = (+row+bias+1) + ',' + (+col-2);
                    leftnode = document.getElementById(leftpossible);
                    highlightedSquares.add(leftnode);
                }
            }
            else
                leftpossible = (+row + bias) + ',' + null;
            console.log("leftmove coord: ", leftpossible);

            if ((+col + 1) !== null) {
                rightpossible = (+row + bias) + ',' + (+col + 1);
                rightnode = document.getElementById(rightpossible);
                if((world[+row+bias][+col+1] !== currentPlayer) && (world[+row+bias][+col+1] !== opponentPlayer)){
                    highlightedSquares.add(rightnode);
                }
                // Implement right jump highlighting
                // BLACK
                if((world[+row+bias][+col+1] === opponentPlayer) && (world[+row+bias+1][+col+2] ==='') && (opponentPlayer === PLAYER_2)){
                    rightpossible = (+row+bias+1) + ',' + (+col+2);
                    rightnode = document.getElementById(rightpossible);
                    highlightedSquares.add(rightnode);
                }
                // WHITE
                if((world[+row+bias][+col+1] === opponentPlayer) && (world[+row+bias-1][+col+2] ==='') && (opponentPlayer === PLAYER_1)){
                    rightpossible = (+row+bias-1) + ',' + (+col+2);
                    rightnode = document.getElementById(rightpossible);
                    highlightedSquares.add(rightnode);
                }
            }
            else
                rightpossible = (+row + bias) + ',' + null;
            console.log("rightmove coord: ", rightpossible);
            //let leftnode = document.getElementById(leftpossible);
            //let rightnode = document.getElementById(rightpossible);
            //highlightedSquares.add(leftnode);
            //highlightedSquares.add(rightnode);
            console.log("just hinted: ", highlightedSquares, " highlightedSquares");
            highlightedSquares.forEach(hintSquare);

            //leftnode.style.background = 'yellow';

            //rightnode.style.background = 'yellow';

            w.addEventListener('click', movePiece, {once:true});
        }
    } else {
        logError("nonselectable piece");
        //selectedPiece = false;
        alert("Please select a different piece!");
        w.addEventListener('click', selectPiece, {once:true});
    }
};



const hintSquare = (s) => {
    if(s !== null)
        s.style.background = 'yellow';
};

const unhintSquare = (s) => {
    if(s !== null)
        s.style.background = 'dimgray';
};

const movePiece = (e) => {
    let requestedSquare = e.target;
    let coords = requestedSquare.id; // returns a string, therefor coords is also a string value.
    let rowInt = parseInt(coords[0]);
    let colInt = parseInt(coords[2]);
    let row;
    let col;
    let selectedCoords = [selectedPiece.id[0], selectedPiece.id[2]];
    let capturedCoords = [];
    console.log("movePiece: ", requestedSquare, "; coords: ", coords);
    // BLACK
    if (currentPlayer === PLAYER_1) {
        if ((selectedCoords[0] - rowInt === -1) && (Math.abs(selectedCoords[1] - colInt) === 1) &&
            (world[rowInt][colInt] !== currentPlayer) && (world[rowInt][colInt] !== opponentPlayer) && (world[rowInt][colInt]!== 'x')
            && (world[coords[0]][coords[2]] !== world[selectedCoords[0]][selectedCoords[1]])){
            row = coords[0];
            col = coords[2];
            console.log("Moving piece: [%s,%s]", row, col);
            isValid = true;
            isJump = false;
        }
        else {
            console.log("Jump over ", rowInt-1, ',', colInt+1 ,'OR', rowInt-1,',', colInt-1,'. Requested Square ID: ', requestedSquare.id);
            // JUMP LEFT (BLACK)
            if (((selectedCoords[0] - rowInt === -2) && (selectedCoords[1] - colInt) === 2) &&
                (world[rowInt-1][colInt+1] === opponentPlayer) && (world[rowInt][colInt] !== 'x')
                && (world[coords[0]][coords[2]] !== world[selectedCoords[0]][selectedCoords[1]])) {
                row = coords[0];
                col = coords[2];
                console.log("Moving piece: [%s,%s]", row, col);
                capturedCoords[0] = rowInt-1;
                capturedCoords[1] = colInt+1;
                isValid = true;
                isJump = true;
            }
            // JUMP RIGHT (BLACK)
            if (((selectedCoords[0] - rowInt === -2) && (selectedCoords[1] - colInt) === -2) &&
                (world[rowInt - 1][colInt - 1] === opponentPlayer) && (world[rowInt][colInt] !== 'x')
                && (world[coords[0]][coords[2]] !== world[selectedCoords[0]][selectedCoords[1]])) {
                row = coords[0];
                col = coords[2];
                console.log("Moving piece: [%s,%s]", row, col);
                capturedCoords[0] = rowInt-1;
                capturedCoords[1] = colInt-1;
                isValid = true;
                isJump = true;
            }
            else {
                if(!isValid || (world[coords[0]][coords[2]] === world[selectedCoords[0]][selectedCoords[1]])) {
                    alert("Move is not valid!");
                    isValid = false;
                    isJump = false;
                }
            }
        }
    }
    // WHITE
    if (currentPlayer === PLAYER_2){
        if ((selectedCoords[0] - rowInt === 1) && (Math.abs(selectedCoords[1] - colInt) === 1) &&
            (world[rowInt][colInt] !== currentPlayer) && (world[rowInt][colInt] !== opponentPlayer) && (world[rowInt][colInt] !== 'x')
            && (world[coords[0]][coords[2]] !== world[selectedCoords[0]][selectedCoords[1]])) {
            row = coords[0];
            col = coords[2];
            console.log("Moving piece: [%s,%s]", row, col);
            isValid = true;
            isJump = false;
        }
        else {
            console.log("Jump over ", rowInt+1 ,',', colInt +1 ,'OR', rowInt+1 ,',' , colInt -1);
            // JUMP LEFT (WHITE)
            if (((selectedCoords[0] - rowInt === 2) && (selectedCoords[1] - colInt) === 2) &&
                (world[rowInt+1][colInt+1] === opponentPlayer) && (world[rowInt][colInt] !== 'x')
                && (world[coords[0]][coords[2]] !== world[selectedCoords[0]][selectedCoords[1]])) {
                row = coords[0];
                col = coords[2];
                console.log("Moving piece: [%s,%s]", row, col);
                capturedCoords[0] = rowInt+1;
                capturedCoords[1] = colInt+1;
                isValid = true;
                isJump = true;
            }
            // JUMP RIGHT (WHITE)
            if ((selectedCoords[0] - rowInt === 2) && (selectedCoords[1] - colInt === -2) &&
                (world[rowInt+1][colInt-1] === opponentPlayer) && (world[rowInt][colInt] !== 'x')
                && (world[coords[0]][coords[2]] !== world[selectedCoords[0]][selectedCoords[1]])) {
                row = coords[0];
                col = coords[2];
                console.log("Moving piece: [%s,%s]", row, col);
                capturedCoords[0] = rowInt+1;
                capturedCoords[1] = colInt-1;
                isValid = true;
                isJump = true;
            }
            else {
                if (!isValid || (world[coords[0]][coords[2]] === world[selectedCoords[0]][selectedCoords[1]])) {
                    alert("Move is not valid!");
                    isValid = false;
                    isJump = false;
                }
            }
        }
    }
    //console.log("Moving piece: [%s,%s]", row, col);

    //requestedSquare.style.background = "red"
    w.addEventListener('click', selectPiece, {once: true});

    if ((isValid && world[row][col] !== 'x')){ //&& (world[coords[0]][coords[2]] !== world[selectedCoords[0]][selectedCoords[1]])) {
        setTimeout(((playerColor) => {
            highlightedSquares.forEach(unhintSquare);
            highlightedSquares.clear();
            console.log("just unhinted and cleared: ", highlightedSquares, " highlightedSquares");

            console.log("Setting timeout with ", playerColor, " moving into the spot");
            selectedPiece.style.background = "dimgray";
            selectedPiece.innerHTML = '';
            //requestedSquare.style.background = playerColor;
            requestedSquare.innerHTML = 'dimgray';
            if (playerColor.substr(0, 1) === 'w') {
                requestedSquare.innerHTML = '&#9898';
            }
            if (playerColor.substr(0, 1) === 'b') {
                requestedSquare.innerHTML = '&#9899';
            }
            //requestedSquare.innerHTML = "[" + playerColor.substr(0,1) + "]";
            world[row][col] = playerColor;
            console.log("selectedcoords: ", selectedCoords);
            console.log("selectedCoord[0]:", selectedCoords[0], "; selectedCoords[1]:", selectedCoords[1]);
            console.log("world[selectedCoords[0],selectedCoords[1]]:", world[selectedCoords[0]][selectedCoords[1]]);
            world[selectedCoords[0]][selectedCoords[1]] = '';
        })(currentPlayer), 30000);

        if (!isJump) {
            currentPlayer = (currentPlayer == PLAYER_1) ? PLAYER_2 : PLAYER_1;
            opponentPlayer = (opponentPlayer == PLAYER_2) ? PLAYER_1 : PLAYER_2;
            bias *= -1;
            document.getElementById('player').innerHTML = currentPlayer;
            console.log("now ", currentPlayer, "'s turn!");
            w.addEventListener('click', selectPiece, {once: true});
        }
        else {
            let captured;
            let capturedNode;
            // update player score
            if (currentPlayer === PLAYER_1) {
                player1Score++;
                console.log("Player 1 (Black) Score: ", player1Score);
                let p1Score = document.getElementById("player1-score");
                p1Score.textContent = player1Score;
            }
            if (currentPlayer === PLAYER_2) {
                player2Score++;
                console.log("Player 1 (Black) Score: ", player2Score);
                let p2Score = document.getElementById("player2-score");
                p2Score.textContent = player2Score;
            }
            // remove captured piece from board
            world[capturedCoords[0]][capturedCoords[1]] = '';
            captured = (capturedCoords[0]) + ',' + (capturedCoords[1]);
            capturedNode = document.getElementById(captured);
            capturedNode.innerHTML = '';

            // Check if GAME OVER
            // If Cat Army (player 1) wins...
            if (player1Score === 12 && player1Score > player2Score){
                alert("Cat Army has won the battle!");
                refreshPage();
            }
            // If Hound Army (player 2) wins...
            if (player2Score === 12 && player1Score > player2Score){
                alert("Hound Army has won the battle!");
                refreshPage();
            }

            prevSelectedPiece[0] = rowInt;
            prevSelectedPiece[1] = colInt;
        }
        // check for another jump...
        selectedCoords = [parseInt(selectedPiece.id[0]), parseInt(selectedPiece.id[2])];
        console.log(typeof selectedCoords[0]);
        console.log(typeof prevSelectedPiece[0]);
        //bias *= -1;
        //document.getElementById('player').innerHTML = currentPlayer;
        //console.log("now ", currentPlayer, "'s turn!");

        //if(isJump) {
        //    while (selectedCoords !== oldSelectedPiece) {
        //        console.log("You can only move the last jumped piece!");
        //        w.addEventListener('click', selectPiece, {once: true});
        //    }
        //}

    }
    else{
        if(!isValid || (world[row][col] !== world[selectedCoords[0]][selectedCoords[1]])){
            highlightedSquares.forEach(unhintSquare);
            highlightedSquares.clear();
            console.log("just unhinted and cleared: ", highlightedSquares, " highlightedSquares");
        }
    }
};



const startTheClock = () => {

    setInterval(()=>{
        let player = ((currentPlayer == PLAYER_1) ? 'p1sc' : 'p2sc');
        console.log("player waiting " + currentPlayer);
        let shotclock = document.getElementById(player);
        shotclock.innerHTML = (player == 'p1sc') ? sc1++ : sc2++;
    },1000)

};

const init = () => {
    w = drawWorld();
    console.log(w);
    w.addEventListener('click', selectPiece, {once:true});
    console.log(currentPlayer);
    document.getElementById('player').innerHTML = currentPlayer;
    startTheClock();
};

// Collapsible Manual function
var x;
var button = document.getElementsByClassName('collapsible');
for (x = 0; x < button.length; x++) {
    button[x].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

function refreshPage(){
    window.location.reload();
}

//Test function for moving pieces
const test = () => {
    let testingPiece = document.getElementById('2,1');
    try{
        movePiece(testingPiece.click());
    }
    catch(error){
        alert('Successfully tested the selection of a piece and displayed optional moves! Try moving the piece. There are no more tests to run. Enjoy the game!');
    }
}

