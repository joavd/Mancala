var express = require('express');
var router = express.Router();

// 1 = p1, 0 = p2, made to simplify changing players
let player1 = true;
let startingStones, pits, board, bigPit1, bigPit2;

router.get('/', function (req, res) {
  // Disable cache to test
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);

  pits = req.query.pits;
  startingStones = req.query.stones;
  bigPit1 = pits;
  bigPit2 = pits * 2 + 1;
  PrepareBoard();

  res.json({ board, player1 });
});

router.get('/play', function (req, res) {
  // Disable cache to test
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);

  PlayTurn(req.query.pit);

  res.json({ board, player1 });
});

// Creates an array with x pits for each player plus 2 big pits, and initializes respective values
function PrepareBoard() {
  board = Array(pits * 2 + 2).fill(startingStones);
  board[bigPit1] = 0;
  board[bigPit2] = 0;
}

function PlayTurn(pit) {
  const stonesToMove = board[pit];
  let currentPit = pit;
  board[currentPit] = 0;

  for (let stonesMoved = 0; stonesMoved < stonesToMove; stonesMoved++) {
    currentPit++;

    // Skips over the big pits of the other player
    if (
      (board[currentPit] === bigPit1 && !player1) ||
      (board[currentPit] === bigPit2 && player1)
    )
      continue;

    board[currentPit]++;

    // If it reaches the end of the board goes back to the beggining
    if (currentPit === board.length - 1) currentPit = 0;
  }
}

module.exports = router;
