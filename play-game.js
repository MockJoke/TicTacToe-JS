const{game} = require("./game");

const play = game("Player1", "Player2");

let [result, board] = play("X", 1);

const printBoard = (board) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 1; j <= 3; j++) {
            process.stdout.write(`${board[3 * i + j] || "_"} `);
        }
        process.stdout.write("\n");
    }
    
    // console.log(`${board[1] || '_'}  ${board[2] || '_'}  ${board[3] || '_'}`);
    // console.log(`${board[4] || '_'}  ${board[5] || '_'}  ${board[6] || '_'}`);
    // console.log(`${board[7] || '_'}  ${board[8] || '_'}  ${board[9] || '_'}`);
};

printBoard(board);