var express = require('express');
var router = express.Router();

// 1 = p1, 0 = p2, used to simplify changing players
let player1, startingStones, pits, board, bigPit1, bigPit2;

router.get('/', function (req, res) {
  // Disable cache to test
  //   res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  //   res.header('Pragma', 'no-cache');
  //   res.header('Expires', 0);

  pits = req.query.pits;
  startingStones = req.query.stones;
  bigPit1 = pits;
  bigPit2 = pits * 2 + 1;
  PrepareBoard();

  res.json({ board, player1 });
});

router.get('/play', function (req, res) {
  PlayTurn(req.query.pit);

  res.json({ board, player1 });
});

// Creates an array with x pits for each player plus 2 big pits, and initializes respective values
function PrepareBoard() {
  board = Array(pits * 2 + 2).fill(startingStones);
  board[bigPit1] = 0;
  board[bigPit2] = 0;
  player1 = true;
}

function PlayTurn(pit) {
  const stonesToMove = board[pit];
  let currentPit = pit;
  board[currentPit] = 0;

  for (let stonesMoved = 0; stonesMoved < stonesToMove; stonesMoved++) {
    currentPit++;

    // Checks if it's an opponent's big pits, if yes it compensates the stone unplaces, if not it places the stone
    if (
      (parseInt(currentPit) === parseInt(bigPit1) && !player1) ||
      (parseInt(currentPit) === parseInt(bigPit2) && player1)
    )
      stonesMoved--;
    else board[currentPit]++;

    // If it reaches the end of the board goes back to the beggining, unless it doesn't have stones to play
    const hasReachedTheEnd = currentPit === board.length - 1;
    const hasStonesLeftToPlay = !(stonesMoved === stonesToMove - 1);
    if (hasReachedTheEnd && hasStonesLeftToPlay) currentPit = -1;
  }

  // If it ends in a big pit of the same player it plays again, otherwise it changes player
  if (
    !(parseInt(currentPit) === parseInt(bigPit1) && player1) &&
    !(parseInt(currentPit) === parseInt(bigPit2) && !player1)
  )
    player1 = !player1;
}

module.exports = router;
