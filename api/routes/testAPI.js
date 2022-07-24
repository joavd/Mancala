var express = require('express');
var router = express.Router();

// 1 = p1, 0 = p2, used to simplify changing players
let player1 = true,
  startingStones,
  pits,
  board,
  bigPit1,
  bigPit2;

router.get('/', function (req, res) {
  pits = parseInt(req.query.pits);
  startingStones = parseInt(req.query.stones);
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
    const currentPitIsEmpty = board[currentPit] === 0;
    let hasStonesLeftToPlay;

    // Checks if it's an opponent's big pits, if yes it compensates the stone unplaced, if not it places the stone
    if (
      (currentPit === bigPit1 && !player1) ||
      (currentPit === bigPit2 && player1)
    )
      stonesMoved--;
    else {
      hasStonesLeftToPlay = !(stonesMoved === stonesToMove - 1);
      const isPlayer1pit = currentPit < bigPit1;
      const isPlayer2pit = currentPit > bigPit1 && currentPit < bigPit2;
      // If it's the last stone in an own pit it gets all the others from opposite side into the big pit
      if (
        !hasStonesLeftToPlay &&
        currentPitIsEmpty &&
        ((isPlayer1pit && player1) || (isPlayer2pit && !player1))
      ) {
        const oppositePit = board.length - 2 - currentPit;

        isPlayer1pit
          ? (board[bigPit1] += board[oppositePit] + 1)
          : (board[bigPit2] += board[oppositePit] + 1);

        board[oppositePit] = 0;
      } else {
        board[currentPit]++;
      }
    }

    // If it reaches the end of the board goes back to the beggining, unless it doesn't have stones to play
    const hasReachedTheEnd = currentPit === board.length - 1;
    hasStonesLeftToPlay = !(stonesMoved === stonesToMove - 1);
    if (hasReachedTheEnd && hasStonesLeftToPlay) currentPit = -1;
  }

  // If it ends in a big pit of the same player it plays again, otherwise it changes player
  if (
    !(currentPit === bigPit1 && player1) &&
    !(currentPit === bigPit2 && !player1)
  )
    player1 = !player1;
}

function CheckBoardState() {}

module.exports = router;
