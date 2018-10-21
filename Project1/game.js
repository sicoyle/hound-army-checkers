const PLAYER_1='black';
const PLAYER_2='white';
var currentPlayer=PLAYER_1;
var bias=1;
var selectedPiece;
var highlightedSquares = new Set();
var sc1=0;
var sc2=0;

const world = [
    ['black','black','black','black','black','black','black','black'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['white','white','white','white','white','white','white','white']
];

var w;

const drawWorld = () => {
    console.log("Drawing world...");
    let ul = document.createElement("ul");
    let anchor = document.getElementById("world"); 
    let list = anchor.appendChild(ul);
    for(row in world) {
        console.log("On row: " + row);
        let li = document.createElement("li");
        let currentList = list.appendChild(li);
        for(column in world[row]) {
            let DOMpiece = document.createElement("p");
            DOMpiece.id = [row,column];
            console.log("Piece: " + column);
            console.log(world[row][column]);
            switch(world[row][column]){
                case 'white':
                    console.log("White piece!");
                    DOMpiece.innerHTML = "[w]";
                    DOMpiece.style.background = "white"
                    break;
                case 'black':
                    console.log("Black piece!");
                    DOMpiece.innerHTML = "[b]";
                    DOMpiece.style.background = "black"
                    break;
                default:
                    console.log("empty piece!");
                    DOMpiece.innerHTML = "[_]";
                    DOMpiece.style.background = "red"
                    break;
            }
            currentList.appendChild(DOMpiece);
        }
    }
    console.log("Donezo");
    return anchor;
}

const logError = (err) => console.error(err);

const isSelectableChecker = (row,col) => { return (world[row][col] == currentPlayer) ? true : false; }

const selectPiece = (e) => {
    requestedPiece = e.target;
    let coords = requestedPiece.id;
    console.log("requestedPiece: ", requestedPiece, "; coords: ", coords);
    let row = coords[0];
    let col = coords[2];
    console.log("world piece: [%s,%s] === %s", row, col, world[row][col]);
    if(isSelectableChecker(row,col)){
        selectedPiece = requestedPiece;
        document.getElementById('actor').innerHTML = selectedPiece.id;
        let leftpossible = (+row+bias)+','+(+col-1);
        console.log("leftmove coord: ",leftpossible);
        let rightpossible = (+row+bias)+','+(+col+1);
        console.log("rightmove coord: ",rightpossible);
        let leftnode = document.getElementById(leftpossible);
        let rightnode = document.getElementById(rightpossible);
        highlightedSquares.add(leftnode);
        highlightedSquares.add(rightnode);
        console.log("just hinted: ", highlightedSquares, " highlightedSquares");
        highlightedSquares.forEach(hintSquare);
        //leftnode.style.background = 'yellow';
        //rightnode.style.background = 'yellow';
        w.addEventListener('click', movePiece, {once:true});
    } else {
        logError("nonselectable piece");
        //selectedPiece = false;
        w.addEventListener('click', selectPiece, {once:true});
    }
}

const hintSquare = (s) => s.style.background = 'yellow';
const unhintSquare = (s) => s.style.background = 'red';

const movePiece = (e) => {
    requestedSquare = e.target;
    let coords = requestedSquare.id;
    let selectedCoords = [selectedPiece.id[0],selectedPiece.id[2]];
    console.log("movePiece: ", requestedSquare, "; coords: ", coords);
    let row = coords[0];
    let col = coords[2];
    console.log("Moving piece: [%s,%s]", row, col);
    //requestedSquare.style.background = "red"
    w.addEventListener('click', selectPiece, {once:true});
    setTimeout(((playerColor) => {
        highlightedSquares.forEach(unhintSquare);
        highlightedSquares.clear();
        console.log("just unhinted and cleared: ", highlightedSquares, " highlightedSquares");

        console.log("Setting timeout with ", playerColor, " moving into the spot");
        selectedPiece.style.background = "red";
        selectedPiece.innerHTML = "[_]";
        requestedSquare.style.background = playerColor;
        requestedSquare.innerHTML = "[" + playerColor.substr(0,1) + "]";
        world[row][col] = playerColor;
        console.log("selectedcoords: ", selectedCoords);
        console.log("selectedCoord[0]:",selectedCoords[0],"; selectedCoords[1]:",selectedCoords[1]);
        console.log("world[selectedCoords[0],selectedCoords[1]]:",world[selectedCoords[0]][selectedCoords[1]]);
        world[selectedCoords[0]][selectedCoords[1]] = '';
    })(currentPlayer), 30000)
    currentPlayer = (currentPlayer == PLAYER_1) ? PLAYER_2 : PLAYER_1;
    bias*=-1;
    document.getElementById('player').innerHTML = currentPlayer;
    console.log("now ", currentPlayer, "'s turn!");
}

const startTheClock = () => {
setInterval(()=>{
    let player = ((currentPlayer == PLAYER_1) ? 'p1sc' : 'p2sc');
    console.log("player waiting " + currentPlayer);
    let shotclock = document.getElementById(player);
    shotclock.innerHTML = (player == 'p1sc') ? sc1++ : sc2++;
},1000)
}

const init = () => {
    w = drawWorld();
    console.log(w);
    w.addEventListener('click', selectPiece, {once:true});
    console.log(currentPlayer);
    document.getElementById('player').innerHTML = currentPlayer;
    //startTheClock();

}