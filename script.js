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

//white for start буде висіти менюшка
//createMenu
//destroy/hideMenu

createMarking();

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
        || boardPos[i][j] == 0){
        return;
    }

    if (squareElement !== currentSquare) {
        if (currentSquare) {

            currentSquare.style.backgroundColor = 'gray';
        }
        currentSquare = squareElement;
    }
    squareElement.style.backgroundColor = '#989898';
}

function makeMove(squareElement, i, j) {

    if (squareElement === currentSquare || boardPos[i][j] == -1 || !currentSquare)
        return;

    //маю id куди маю попасти
    //маю елемент з якого буду стрибати
    //маю id шашки яка буде стрибати

    let currentID = currentSquare.id.split('').map(Number);

    console.log(currentID);

    console.log(currentID[1] -j);

    console.log("currentID");

    console.log(currentID[1] - j);

    

    if (((currentID[1] - j) !== 1) && ((currentID[1] - j) !== -1)){
        return;
    }

    //якщо 3 то перестрибувати

    if(boardPos[currentID[0]][currentID[1]] === 1){

        if(i > currentID[0]){
            return;
        }

        //перевірити чи перед ним є фішка і якого кольору типу 
        //якщо свого то

    }
    else{
        //black
        if(i < currentID[0]){
            return;
        }

        //перевірити чи перед ним є фішка і якого кольору
    }

    console.log("asdf");
    squareElement.style.backgroundImage = currentSquare.style.backgroundImage;
    currentSquare.style.backgroundColor = 'gray';
    currentSquare.style.backgroundImage = null;

    boardPos[i][j] = boardPos[currentID[0]][currentID[1]];
    boardPos[currentID[0]][currentID[1]] = 0;

    currentWhiteMove = !currentWhiteMove;
    currentSquare = null;
}


/*function makeMove(squareElement) {

   

        if (currentSquare && squareElement.style.backgroundColor == 'gray') {

            let diff = squareElement.id - currentSquare.id;

            if (document.getElementById(squareElement.id.checker != 'none')) {}

            

            if((diff == 7 || diff == 9) && currentSquare.checker == 'w')
                return;
                
            if((diff == -7 || diff == -9) && currentSquare.checker == 'b')
                return;
                
            if(diff != 7 && diff != 9 && diff != -9 && diff != -7)
                return;
                
            if (squareElement.checker === 'none') {

                squareElement.style.backgroundImage = currentSquare.style.backgroundImage;
                currentSquare.style.backgroundColor = 'gray';
                currentSquare.style.backgroundImage = null;

                squareElement.checker = currentSquare.checker;
                currentSquare.checker = 'none';

                currentWhiteMove = !currentWhiteMove;
                currentSquare = null;

            }else if(squareElement.checker != currentSquare.checker){

            }

    }
}*/

// обробник натискання на квадрат типу куди перемістити фігуру
// глобальну змінну чий хід
// з індексами бавитись












