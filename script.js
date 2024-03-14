const SQUARES_COUNT = 64;
const WHITE_CHECKER = 1;
const BLACK_CHECKER = 2;
const NO_CHECKER = 0;

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
        square.style.backgroundColor = isWhitePeace ? 'white' : 'gray';
        square.id = isWhitePeace ? 'w' : i;

        if ((i < 24 || i > 39) && !isWhitePeace) {
            square.style.backgroundImage = "url(" + (i < SQUARES_COUNT / 2 ? 'images/black.png' : 'images/white.png') + ")";
        }

        board.appendChild(square);

        square.addEventListener('click', function() {
                squareClick(this.id);
        });
    }
    
}

function squareClick(squreId) {

    let squareElement = document.getElementById(squreId);

    if (squareElement.id.includes('w')) {

        return;
    }

    //фокус на поточному вибраній клітинці
    setFocus(squareElement);

    //хід зробити нормально

    if (squareElement !== currentSquare) {

        if (currentSquare && squareElement.style.backgroundColor == 'gray') {

            let diff = parseInt(squareElement.id) - parseInt(currentSquare.id);

            console.log(diff);

            if(diff == 7 || diff == 9 || diff == -9 || diff == -7){

                squareElement.style.backgroundImage = currentSquare.style.backgroundImage;
                currentSquare.style.backgroundColor = 'gray';

                currentSquare.style.backgroundImage = null;

                currentWhiteMove = !currentWhiteMove;
                currentSquare = null;

            }
        }
    }

    //тепер дозволяти хід тільки згідно з правилами шашок

  
}

function setFocus(squareElement) {

    if ((squareElement.style.backgroundImage.includes('white') && !currentWhiteMove) 
        || (squareElement.style.backgroundImage.includes('black') && currentWhiteMove)
        || squareElement.style.backgroundImage === ''){
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

// обробник натискання на квадрат типу куди перемістити фігуру
// глобальну змінну чий хід
// з індексами бавитись












