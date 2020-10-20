
const Gameboard = (() => {
    const gameboard = [["","",""],["","",""],["","",""]];

    const addMark = (mark,spot) => {
        console.log(spot);
        console.log(mark);
        let markIndex = spot.split(" ");
        if(gameboard[markIndex[0]][markIndex[1]] == ""){
            gameboard[markIndex[0]][markIndex[1]] = mark;
            // console.log(`placed ${mark}`);
        }
        else{
            // console.log(`spot ${markIndex} already taken`);
            //TODO-- signal spot taken!
        }
    }

    const display = () =>{
        console.table(gameboard);
    }

    return{addMark, display};
})();

const Player = (name,mark) =>{ //'mark' X or O
    const getName = () => name;
    const getMark = () => mark;

    const placeMark = spot => { 
        //spot index's for row and column
        //ex spot = '0 0'
        //must be able to avoid placing mark when another mark 
        //already exists!
        Gameboard.addMark(mark, spot);
    }
    return{placeMark};
}


const mike = Player("mike","X");
const bob = Player("bob","O");
mike.placeMark('1 0');
bob.placeMark('1 1');
Gameboard.display();