
// Players
const PLAYERS = {
  FIRST_PLAYER : 0,
  SECOND_PLAYER : 1
}

// Game Status Constants
//
const GAME_STATUS = {    
  DREW_GAME : 2,
  ON_GOING : 3,
  WINNER_FOUND : 4,
}

const GAME_FIRST_STATUS = {
    historyGame:  [
        {
            board: Array(9).fill(null),
            timeStamp : new Date(),
        }
        ],
        players : [
        {
            symbolMark : 'X',
            nickName : 'Pessoa'
        },
        {
            symbolMark : 'O',
            nickName : 'Hemingway'
        }
        ],
        currentBoardHistory : 0,  
        statusGame : GAME_STATUS.ON_GOING,
        numberOfPlays : 0,
        numberOfSquares : 9,
        currentPlayer : 0, 
}


module.export= {PLAYERS, GAME_STATUS, GAME_FIRST_STATUS};