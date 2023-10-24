const game = (xName, oName) => {
    const X = "X";
    const O = "O";
    let currPlayer = X;

    const players = {
        X: xName,
        O: oName,
    }

    // Lookup Table
    const nextPlayer = {
        X: O,
        O: X,
    }

    // Visual representation of the data structure
    const board = [
        "ongoing",  // game status
        "", "", "",
        "", "", "",
        "", "", "",
    ];

    const isValidMove = (move) => {
        return (1 <= move && move <= 9) && board[move] === "";
    };

    const computeStatus = () => {

        const winningCombos = [
            // rows
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],

            // columns
            [1, 4, 7],
            [2, 5, 6],
            [3, 6, 9],

            // diagonals
            [1, 5, 9],
            [3, 5, 7],
        ]

        // check for win - X or O
        const isWin = winningCombos.some(([i1, i2, i3]) => {
            return (board[i1] === board[i2] && board[i2] === board[i3] && board[i3] === currPlayer);
        });

        if (isWin)
            return `win-${currPlayer}`;

        // check for a draw
        // let areAllCellsTaken = true;
        // for (let i = 1; i <= 9; i++) {
        //     if (board[i] === "") {
        //         areAllCellsTaken = false;
        //     }
        // }
        if (board[0] === "ongoing") {
            let areAllCellsTaken = board.slice(1).every(cell => cell !== "");
            if (areAllCellsTaken) {
                return "draw";
            }
        }

        // if (areAllCellsTaken)
        //     return "draw";

        return "ongoing";
    };

    return (player, move) => {
        // Validate right player
        if (player !== currPlayer) {
            return [false, currPlayer, `Not your turn. It's ${currPlayer}'s turn`];
        }

        // Validate right move
        if (!isValidMove(move)) {
            return [false, currPlayer, `Invalid move, try again`];
        }

        board[move] = currPlayer;
        board[0] = computeStatus();
        currPlayer = nextPlayer[currPlayer]; 

        return [true, currPlayer, board];
    }
};

module.exports = { game };