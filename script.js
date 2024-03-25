const SQUARES_COUNT = 64;
const WHITE_CHECKER = 1;
const BLACK_CHECKER = 2;
const NO_CHECKER = 0;

let board = document.getElementById('cBoard');

let currentSquare = null;

let currentWhiteMove = true;

let boardPos = [[-1, 2, -1, 2, -1, 2, -1, 2],
    [2, -1, 2, -1, 2, -1, 2, -1],
    [-1, 2, -1, 2, -1, 2, -1, 2],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [1, -1, 1, -1, 1, -1, 1, -1],
    [-1, 1, -1, 1, -1, 1, -1, 1],
    [1, -1, 1, -1, 1, -1, 1, -1]];


showMenu();

function showMenu() {
    let originalDisplay = board.style.display;
    board.style.display = "none";

    let menu = document.createElement('div');
    menu.className = 'menu';

    let image = document.createElement('img');
    image.src = "images/text.png";
    menu.appendChild(image);

    let checker = document.createElement('img');
    checker.src = "images/whiteQ.png";
    //checker.className = 'rotate';
    menu.appendChild(checker);

    let helpInfo = document.createElement('img');
    helpInfo.src = "images/help.png";
    menu.appendChild(helpInfo);

    document.body.appendChild(menu);

    checker.addEventListener('click', function() {
        startGame(menu, originalDisplay);
    });
}

function startGame(menu, originalDisplay) {
    
    menu.remove();
    board.style.display = originalDisplay;
    createMarking();
    
}

function createMarking(){

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

    if ((boardPos[i][j] == 1 && !currentWhiteMove) 
        || (boardPos[i][j] == 2 && currentWhiteMove)
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

    //маю id куди маю попасти
    //маю елемент з якого буду стрибати
    //маю id шашки яка буде стрибати

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
                //цього не буде якшо дамка
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

        if(boardPos[currentID[0]][currentID[1]] === boardPos[(i+currentID[0])/2][(j+currentID[1])/2])
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

        console.log(boardPos);

        currentWhiteMove = !currentWhiteMove;
        currentSquare = null;

        //потрібно додати перевірку чи можна далі бити
        //if () {}
        //currentWhiteMove = !currentWhiteMove;
        //currentSquare = null;
    }


    else if(boardPos[currentID[0]][currentID[1]] === 3){

        if(boardPos[i][j] !== 0)
            return;

        let difference = (i * 10 + j) - (currentID[0] * 10 + currentID[1]);
        console.log(difference);
        if(difference != 11 || difference != -11 || difference != 9 || difference != -9)
            return;

        //перевіряти перстрибування шашок
        console.log("типу мув");

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