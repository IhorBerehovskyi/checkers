const SQUARES_COUNT = 64;

let board = document.getElementById('cBoard');

let currentSquare = null;

let currentWhiteMove = true;

//white for start буде висіти менюшка
//createMenu
//destroy/hideMenu
createMarking();

function createMarking(){

    for (let i = 0; i < SQUARES_COUNT; i++) {

    let square = document.createElement('div');
    let isWhitePeace = (i + Math.floor(i / 8)) % 2 == 0;
    square.className = 'square';
    square.id = 's' + i;
    square.style.backgroundColor = isWhitePeace ? 'white' : 'gray';

    board.appendChild(square);

    square.addEventListener('click', function() {
            squareClick(this.id);
        });

    if ((i < 24 || i > 39) && !isWhitePeace) {
        let piece = document.createElement('div');
        piece.className = 'piece';
        piece.id = 'p'+ (i < SQUARES_COUNT / 2 ? 'b' : 'w')+ i;
        piece.style.backgroundImage = "url(" + (i < SQUARES_COUNT / 2 ? 'images/black.png' : 'images/white.png') + ")";
        square.appendChild(piece);

        piece.addEventListener('click', function() {
            pieceClick(this.id);
        });
    }}
    
}

function pieceClick(pieceId) {

    let pieceElement = document.getElementById(pieceId);
    let squareElement = pieceElement.parentNode;

    if ((pieceElement.id.includes('w') && !currentWhiteMove) 
        || (pieceElement.id.includes('b') && currentWhiteMove)){
        currentSquare = squareElement;
        return;
    }


    if (squareElement !== currentSquare) {

        if (currentSquare) {

            currentSquare.style.backgroundColor = 'gray';
        }
        currentSquare = squareElement;
    }

    //if(pieceElement.style.backgroundImage === 'images/white.png')

    squareElement.style.backgroundColor = '#989898';
  
}


function squareClick(squreId) {

    let squareElement = document.getElementById(squreId);
    
     if (squareElement !== currentSquare) {

        let pieceElement = currentSquare.querySelector('.piece');

        if (currentSquare && pieceElement && squareElement.style.backgroundColor == 'gray') {
            currentSquare.removeChild(pieceElement);
            currentSquare.style.backgroundColor = 'gray';
            squareElement.appendChild(pieceElement);
            currentWhiteMove = !currentWhiteMove;
        }
        
    }

  
}


// обробник натискання на квадрат типу куди перемістити фігуру
// глобальну змінну чий хід
// з індексами бавитись












