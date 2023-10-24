const{ game } = require("./game");

const prompt = require('prompt-sync')();

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let xPlayer, oPlayer, currentPlayer, play;

const printBoard = (board) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 1; j <= 3; j++) {
            process.stdout.write(`${board[3 * i + j] || "_"} `);
        }
        process.stdout.write("\n");
    }
    
    board[0] !== "ongoing" && console.log(board[0]);

    // console.log(`${board[1] || '_'}  ${board[2] || '_'}  ${board[3] || '_'}`);
    // console.log(`${board[4] || '_'}  ${board[5] || '_'}  ${board[6] || '_'}`);
    // console.log(`${board[7] || '_'}  ${board[8] || '_'}  ${board[9] || '_'}`);
};

const getUserMove = (currPlayer) => {
    return new Promise((resolve, reject) => {
        const move = parseInt(prompt(`Enter your move for Player ${currPlayer}: `));

        [result, currentPlayer, board] = play(currPlayer, move);

        if (result) {
            if (board[0] === "ongoing") {
                printBoard(board);
                resolve(getUserMove(currentPlayer));
            }
            else {
                resolve(board);
            }
        }
        else {
            console.log(board);
            resolve(getUserMove(currentPlayer));
        }
    });
    // readline.question(`Enter your move for Player ${currPlayer}: `, (move) => {
    //     [result, board] = play(currPlayer, move);

    //     if (result) {
    //         printBoard(board);

    //         // if (board[0] === "ongoing") {
    //         //     const 
    //         // }
    //     }
    // });
};

const getUserNames = async () => {
    xPlayer = prompt("Enter player name for X: ");
    oPlayer = prompt("Enter player name for O: ");

    // Initialise the play
    play = game(xPlayer, oPlayer);

    try {
        const finalBoard = await getUserMove("X");
        printBoard(finalBoard);
    }
    catch (error) {
        console.error(error);
    }
}

getUserNames();