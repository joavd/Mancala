var express = require('express');
var router = express.Router();

let player1 = true, // true = p1, false = p2, used to simplify changing players, undefined = tie
  gameEnded = false,
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
  PlayTurn(parseInt(req.query.pit));
  CheckBoardState();

  res.json({ board, player1, gameEnded });
});

// Creates an array with X pits for each player plus 2 big pits, and initializes respective values
function PrepareBoard() {
  board = Array(pits * 2 + 2).fill(startingStones);
  board[bigPit1] = 0;
  board[bigPit2] = 0;
  player1 = true;
}

// Plays the current turn according to the pit chosen, distributing the stones across the other pits
function PlayTurn(pit) {
  const stonesToMove = board[pit];
  let currentPit = pit;
  board[currentPit] = 0;

  for (let stonesMoved = 0; stonesMoved < stonesToMove; stonesMoved++) {
    currentPit++;
    const currentPitIsEmpty = board[currentPit] === 0;
    let hasStonesLeftToPlay;

    // Checks if it's an opponent's big pit, if yes it compensates the stone unplaced
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
        // In other cases, it simply places the stone
        board[currentPit]++;
      }
    }

    // If it reaches the end of the board goes back to the beggining, unless it doesn't have stones to play
    const hasReachedTheEnd = currentPit === board.length - 1;
    hasStonesLeftToPlay = !(stonesMoved === stonesToMove - 1);
    if (hasReachedTheEnd && hasStonesLeftToPlay) currentPit = -1;
  }

  UpdatePlayer(currentPit);
}

// If it ends in a big pit of the same player it plays again, otherwise it changes player
function UpdatePlayer(currentPit) {
  if (
    !(currentPit === bigPit1 && player1) &&
    !(currentPit === bigPit2 && !player1)
  )
    player1 = !player1;
}

// Checks the board state to see if there's winning condition
function CheckBoardState() {
  let player1PitsScore = 0,
    player2PitsScore = 0;

  for (let player1Pit = 0; player1Pit < bigPit1; player1Pit++)
    player1PitsScore += board[player1Pit];

  for (let player2Pit = bigPit1 + 1; player2Pit < bigPit2; player2Pit++)
    player2PitsScore += board[player2Pit];

  if (player1PitsScore === 0 || player2PitsScore === 0) {
    player1PitsScore === 0
      ? (board[bigPit2] += player2PitsScore)
      : (board[bigPit1] += player1PitsScore);

    for (let currentPit = 0; currentPit < bigPit2; currentPit++) {
      if (currentPit !== bigPit1) board[currentPit] = 0;
    }

    player1 =
      board[bigPit1] > board[bigPit2]
        ? true
        : board[bigPit1] < board[bigPit2]
        ? false
        : undefined;
    hasEnded = true;
  }
}

module.exports = router;
