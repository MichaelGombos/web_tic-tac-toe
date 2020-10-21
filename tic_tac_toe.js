
const boardLogic = (() => {


    //keep track of winner mark!
    const checkDiagonalWin = (board) => {
        console.table(board);
        if(board[1][1] != "" && 
        ( (board[0][0] == board[1][1] && board[1][1] == board[2][2]) ||
        (board[0][2] == board[1][1] && board[1][1] == board[2][0]) )){
            return true;
        }
        return false;
    }

    const checkVerticalWin = (board) => {
        for(let i = 0; i < 3; i++){
            if( (board[1][i] != "") &&
            (board[0][i] == board[1][i] && board[1][i] == board[2][i])){
                console.log("vert win");
                return true;
            }
        }
        return false;
    }

    const checkHorizantalWin = (board) => {
        for(let i = 0; i < 3; i++){
            if( (board[i][1] != "") &&
            (board[i][0] == board[i][1] && board[i][1] == board[i][2])){
                console.log("hoz win");
                return true;
            }
        }
        return false;
    }

    const checkBoardFull = (board) => {
        for(let i = 0; i < 3; i++){
            if(board[0][i] == "" || board[1][i] == "" || board[2][i] == ""){
                //if one piece is empty board not full
                console.log("board not full")
                return false;
            }
            else{
                console.log("boardFull");
                console.log("draw!!!")
                return true;
            }
        }
    }
    const checkWin = (board) =>{
        const gameBoard = board;
        if(checkDiagonalWin(gameBoard) || checkVerticalWin(gameBoard)
        || checkHorizantalWin(gameBoard)){
            return true;
        }
    }

    return{ checkWin, checkBoardFull};
})();

const DOMboard = (() =>{
    const board = document.querySelector("#board");
    const boxes = board.getElementsByClassName("ticBox");

    for(let i = 0; i < boxes.length;i++){
        boxes[i].addEventListener('click', function(){
            console.log(this.getAttribute("data-index"));
            play(this.getAttribute("data-index"));
        });
    }
    
    //update innerHTML of board to match our running gameBoard
    const updateBoard = (board) =>{
        const board1d = board[0].concat(board[1]).concat(board[2]);
        console.log(board1d);
        //update all innerHTML
        for(let i = 0; i<9;i++){
            boxes[i].innerHTML =  board1d[i];
        }
    };

    const player1 = Player("mike","X");
    const player2 = Player("bob","O");

    let turns = 0;
    const currentPlayer = (player1, player2) =>{
        turns++;
        if(turns %2 != 0){//odds 
            return player1
        }
        else{
            return player2
        }
    }

    const play = (indexValue) =>{
        let curPLayer = currentPlayer(player1,player2)
        curPLayer.placeMark(indexValue);
    }
    return{play, updateBoard};
})();

const Gameboard = (() => {
    const gameboard = [["","",""],["","",""],["","",""]];

    const addMark = (mark,spot) => {

        let markIndex = spot.split(" ");
        if(gameboard[markIndex[0]][markIndex[1]] == ""){
            gameboard[markIndex[0]][markIndex[1]] = mark;
        }
        else{

            // alert("spot taken!");
        }

        if(boardLogic.checkWin(gameboard)){
            console.log(`${mark} won game`);
            //TODO update score
        } 

        DOMboard.updateBoard(gameboard);
    }


    const viewBoard = () =>{
        return gameboard;
    }
    return{addMark, viewBoard};
})();


function Player(name,mark)  { //'mark' X or O
    const getName = () => name;
    const getMark = () => mark;

    const placeMark = spot => { 
        Gameboard.addMark(mark, spot);
    }
    return{placeMark};
}


