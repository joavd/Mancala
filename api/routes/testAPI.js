var express = require('express');
var router = express.Router();

let player1 = true;
let startingStones, pits, board;

router.get('/', function(req, res) {
    // Disable cache to test
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    pits = req.query.pits;
    stones = req.query.stones;
    PrepareBoard();
    
    res.json({board, player1});
});

router.get('/play', function(req, res) {
    // Disable cache to test
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);

    PlayTurn(req.query.pit);
    
    res.json({board, player1});
});

// Creates an array with x pits for each player plus 2 big pits, and initializes respective values 
function PrepareBoard() {
    board = Array((pits * 2) + 2).fill(startingStones);
    board[pits] = 0;
    board[(pits * 2) + 1] = 0;
}

function PlayTurn(pit) {
    const stonesToMove = board[pit];
    let currentPit = pit;

    for (let stonesMoved = 0; stonesMoved < stonesToMove; stonesMoved++) {

    }
}

module.exports = router;