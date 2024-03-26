let boardPos = [[-1, 2, -1, 2, -1, 2, -1, 2],
                [2, -1, 2, -1, 2, -1, 2, -1],
                [-1, 2, -1, 2, -1, 2, -1, 2],
                [0, -1, 0, -1, 0, -1, 0, -1],
                [-1, 0, -1, 0, -1, 0, -1, 0],
                [1, -1, 1, -1, 1, -1, 1, -1],
                [-1, 1, -1, 1, -1, 1, -1, 1],
                [1, -1, 1, -1, 1, -1, 1, -1]];

let currentSquare = null;
let currentWhiteMove = true;

let whiteNumber = 12;
let blackNumber = 12;

showMenu();

function showMenu() {
    
    let menu = document.getElementById('menu');
 
    checker.addEventListener('click', function() {
        menu.remove();
        createMarking();
    });
}

function createMarking(){

    let board = document.createElement('div');
    board.className = "board";
    board.id = "boardId"
    document.body.appendChild(board);

    for(let i = 0; i < boardPos.length; i++){
        for (let j = 0; j < boardPos[0].length; j++) {

            let square = document.createElement('div');

            square.className = 'square';
            square.style.backgroundColor = boardPos[i][j] == -1 ? 'white' : 'gray';
            square.id = `${i}${j}`;

            if(boardPos[i][j] == 1){
                square.style.backgroundImage = "url(images/whiteQ.png)";
            }
            else if(boardPos[i][j] == 2){
                square.style.backgroundImage = "url(images/blackQ.png)";
            }

            board.appendChild(square);

            square.addEventListener('click', function() {
                squareClick(this.id, i, j);
            });

        }
    }
}

function squareClick(squreId, i, j) {

    let squareElement = document.getElementById(squreId);

    if(boardPos[i][j] == -1){
        return;
    }

    setFocus(squareElement, i, j);
    makeMove(squareElement, i, j);
}

function setFocus(squareElement, i , j) {

    if ((boardPos[i][j] % 2 !== 0 && !currentWhiteMove) 
        || (boardPos[i][j] % 2 === 0 && currentWhiteMove)
        || (boardPos[i][j] == 0)){

            return;
    }

    if (squareElement !== currentSquare) {
        if (currentSquare) {

            currentSquare.style.backgroundColor = 'gray';
        }
        currentSquare = squareElement;
    }
    squareElement.style.backgroundColor = '#989898';
    console.log("ep");
}

function makeMove(squareElement, i, j) {

    if (squareElement === currentSquare || boardPos[i][j] == -1 || !currentSquare){
        console.log(i,j);
        return;

    }

    let currentID = currentSquare.id.split('').map(Number);

    //звичайний хід
    if ((((currentID[1] - j) === 1) || ((currentID[1] - j) === -1)) &&
        (((currentID[0] - i) === 1) || ((currentID[0] - i) === -1))){

        //якщо є блокуюча шашка
        if(boardPos[i][j] > 0){
            return;
        }

        //заборона руху назад
        if(boardPos[currentID[0]][currentID[1]] === 1){

            if(i > currentID[0]){
                return;
            }

        }
        else if(boardPos[currentID[0]][currentID[1]] === 2){
            //black
            if(i < currentID[0]){
                return;
            }

        }

        squareElement.style.backgroundImage = currentSquare.style.backgroundImage;
        currentSquare.style.backgroundColor = 'gray';
        currentSquare.style.backgroundImage = null;

        boardPos[i][j] = boardPos[currentID[0]][currentID[1]];
        boardPos[currentID[0]][currentID[1]] = 0;

        currentWhiteMove = !currentWhiteMove;
        currentSquare = null;
        console.log(boardPos);
    }

    //якщо 3 то перестрибувати
    else if ((((currentID[1] - j) === 2) || ((currentID[1] - j) === -2)) &&
        (((currentID[0] - i) === 2) || ((currentID[0] - i) === -2))){

        if(boardPos[i][j] !== 0 || (boardPos[(i+currentID[0])/2][(j+currentID[1])/2] === 0))
            return;

        if(boardPos[currentID[0]][currentID[1]] % 2 === boardPos[(i+currentID[0])/2][(j+currentID[1])/2] % 2)
            return;


         console.log("udar");

        squareElement.style.backgroundImage = currentSquare.style.backgroundImage;
        currentSquare.style.backgroundColor = 'gray';
        currentSquare.style.backgroundImage = null;

        boardPos[i][j] = boardPos[currentID[0]][currentID[1]];
        boardPos[currentID[0]][currentID[1]] = 0;
        boardPos[(i+currentID[0])/2][(j+currentID[1])/2] = 0;

        let deletedId = ((i+currentID[0])/2).toString() + ((j+currentID[1])/2).toString();
        console.log(deletedId);
        document.getElementById(deletedId).style.backgroundImage = null;

        currentWhiteMove ? --blackNumber : --whiteNumber;
        console.log(boardPos);

        currentWhiteMove = !currentWhiteMove;
        currentSquare = null;

        if (whiteNumber === 0 || blackNumber === 0)
            finishGame();
    }
    
    //створення дамки
    if(i === 0 && boardPos[i][j] === 1){

        squareElement.style.backgroundImage = "url(images/whiteQG.png)";
        boardPos[i][j] = 3;

    }else if(i === 7 && boardPos[i][j] === 2){

        squareElement.style.backgroundImage = "url(images/blackQG.png)";
        boardPos[i][j] = 4;

    }
}

function finishGame(){

    document.getElementById('boardId').remove();

    let finishDiv = document.createElement('div');
    finishDiv.id = "finishDiv";
    document.body.appendChild(finishDiv);

    let finishLabel = document.createElement('div');
    finishLabel.id = "finishLabel";
    finishLabel.textContent = (whiteNumber === 0 ? "Black" : "White") + " win"; 
    finishDiv.appendChild(finishLabel);

    let restartButton = document.createElement('button');
    restartButton.textContent = 'RESTART GAME'; 
    restartButton.id = 'restartButton';

    restartButton.addEventListener('click', function() {    
        location.reload();
    });

    finishDiv.appendChild(restartButton);

    let confetti = new JSConfetti();

    confetti.addConfetti({
        emojis: ['🙾', '⚪', '⚫'],
    });

    setInterval(function() {
        confetti.addConfetti({
            emojis: ['🙾', '⚪', '⚫'],
        });
    }, 3000);
}