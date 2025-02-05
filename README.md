# Memo Game
**Memo Game** is a memory card game built using **React**, **Vite**, and styled with **React-Bootstrap**. The objective of the game is to match pairs of cards within the shortest time and fewest moves.

![Game GIF](/public/memo-game-present.gif)

## Features

- **Ranking System**: Players are ranked based on their performance, taking into account the time and moves used to finish the game.
- **Difficulty Selection**: Choose between different difficulty levels (Easy, Medium, Hard) that affect the number of cards and the time allowed to complete the game.
- **Pontuation**: The game tracks your points based on moves and time. The fewer the moves and faster the time, the higher the score.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: A fast and modern build tool for React projects.
- **React-Bootstrap**: A library of pre-styled Bootstrap components for React, offering responsive design.

## Setup Instructions

Follow these steps to get your project up and running locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/vinilima2/memo-game
   cd memo-game
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
## How to Play
1. Register or Log In:
- New players can register by creating an account using their email and password.
- If you already have an account, simply log in to track your progress and access the ranking.
Select a Difficulty Level: Choose from three difficulty levels (Easy, Medium, or Hard). Each level will adjust the number of cards and the available time to complete the game.

2. Start the Game:
- A set of cards will appear face down. Flip over two cards at a time.
- If the cards match, they stay face up. If not, they will turn face down again.
- Keep flipping cards until all pairs are matched.

3. Score and Ranking:
- Your score is calculated based on how quickly you match all pairs and how few moves you use.
- After completing the game, you will see your ranking and score compared to other players.

4. Log Out:
- Once you finish playing, you can log out to switch accounts or play as a guest.