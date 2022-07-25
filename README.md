<div align="center">
    <h1 align="center">
        Mancala 🌱
    </h1>
</div>

<div align="center">
    <p>
        Mancala is a two-player turn-based strategy board game played with small stones, beans, or seeds and rows of holes or pits in the earth, a board or other playing surface. The objective is to capture all or some set of the opponent's pieces.
    </p>
</div>

## Game Rules 🎲

Players begin by placing a certain number of seeds, prescribed for the particular game, in each of the pits on the game board. A player may count their stones to plot the game. A turn consists of removing all seeds from a pit, "sowing" the seeds (placing one in each of the following pits in sequence) and capturing based on the state of the board. The object of the game is to plant the most seeds in the bank.

- Each of the two players has his X pits in front of him. To the right of the X pits, each player
  has a larger pit.
- At the start of the game, there are Y stones in each of the X round pits.
- The player who begins with the first move picks up all the stones in any of his own X pits,
  and sows the stones on to the right, one in each of the following pits, including his own big
  pit.
- No stones are put in the opponents' big pit.
- If the player's last stone lands in his own big
  pit, he gets another turn. This can be repeated several times before it's the other player's
  turn.
- During the game the pits are emptied on both sides.
- When the last stone lands in an
  own empty pit, the player captures his own stone and all stones in the opposite pit (the
  other player’s pit) and puts them in his own Big pit.
- The game is over as soon as one of the sides runs out of stones. The player who still has
  stones in his pits keeps them and puts them in his big pit. The winner of the game is the
  player who has the most stones in his big pit.

## Installation & Set Up 🛠

Clone the repo, then open 2 terminals and run the following on each respectively:

```ps1
cd api/
npm i
npm start
```

```ps1
cd client/
npm i
npm start
```

Then proceed to open a browser window and go to `localhost:3000/?pits=3&stones=5`,
feel free to replace the 3 and 5 with a number of your like,
however for the time being, it only supports numbers from 1 up to 9.
From there proceed to play Mancala (either alone or with another person).

## Tech 💻

This prototype uses [React](https://reactjs.org/) for the frontend and
[Node](https://nodejs.org/) for the backend.

For now this is only a prototype of the game, made in around ~12 hours, so
it has a lot of improvements to be made (which will be talked about in the
next chapter). Expect a rough experience with possible bugs.

This is a very KISS approach to the problem, that tried to be as simple as possible
while moving toward the goal. All the logic lives in the backend, while the UI simply
showcases changes happenned.

The board is represented by an `X * 2 + 2` sized array, where X is the pits chosen as a
parameter. So for example, if it's 3 pits, it'll be 3 small pits for each player plus
another 1 big for each (it looks like this `[small, small, small, big, small, small, small, big]`).

On the UI the trick is only to rotate the respective pits in the board to mimick a real
board of Mancala. The pits are represented by buttons, and the stones themselves by a
number inside the button.

The logic on the backend is somewhat simple as well, just receives the pit that will
pick up the stones from, and then simply loops around the board distributing when possible
according to the Game Rules. At the end checks if there is an ending board state and gives
all that info gack to the frontend to showcase.

## Improvements to be made 🚀

Being such a simple prototype, even though it serves the purpose to representate the game
across a full-stack app, means it has lots of things to improve, given that the developer
dedicates more time and focus to it. These are some big ones that would massively improve
the project, and could be even transformed into Stories/Tickets when picking this project
up again in the future:

- UI/UX

  - Visually the project looks really bad for now, it needs massive improvements in both
    areas
  - An initial screen to properly indicate the starting stones/pits, with a "Play" button
  - Actually use some kind of assets to indicate pits and stones, instead of buttons/number
  - Feedback is really important, needs to have feedback on which pit was chosen, and the
    way stones were distributed, in order to verify the correctness of the move
  - An history tab would be good as well to analyse previous moves

- Tech and implementation

  - Refactor code to best utilize the best practices of programming
  - Use Typescript instead of vanilla JS to make it more robust
  - Create reusable components for the UI using styled-components
  - Rework the backend logic to improve performance and make it more reusable
  - Unit tests all possible things across both frontend and backend
    - For frontend: verify pits and stones for all scenarios depending on responses
    - For backend: verify logic for all scenarios, check endpoints statuses

- More advanced
  - Host it to be accessible to everyone without installing anything, using CI/CD
  - Make it online multiplayer, similar to other popular .io games

## Resources used 📚

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Node documentation](https://nodejs.org/en/docs/)
- [Stack Overflow questions](https://stackoverflow.com/questions)
- [Create a React frontend and a Node backend and connect them together](https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/)
- [Unit testing essentials for Express api](https://betterprogramming.pub/unit-testing-essentials-for-express-api-a-step-by-step-guide-ab4950d3763b)
