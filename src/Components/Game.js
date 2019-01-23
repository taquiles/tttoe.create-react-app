// React 
import React from 'react';

// Styling
import '.././Styling/index.css';

// Application Sub-Components
import HistoryView from './HistoryView';
import BoardTemplate from './BoardTemplate';

// Material.ui 
import Button from '@material-ui/core/Button';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

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


// Reset game's variables
//
class ReStartResetButton extends React.Component {  
    render () {
        return (      
            <Button size="small" onClick={this.props.onClick}>
                Reset Game
            </Button>
        )
    }
}


// Prints Status Game, winner and next play
//
const NextMoveStatus = (props) => {
    let status_txt= '';
        
    if (props.statusGame === GAME_STATUS.DREW_GAME) {
        status_txt = "Drew Game. Click Restart to play once again"
    } else if (props.statusGame === GAME_STATUS.WINNER_FOUND) {
        status_txt = 'Winner: ' + props.player.nickName + ' - ' + props.player.symbolMark;
    } else {
        status_txt = 'Next player: ' + props.player.nickName + ' - ' + props.player.symbolMark;
    }
    
    return (<div><b>{status_txt}</b></div>)
};


// ####################################################################
// Game Component
// 
class Game extends React.Component {
  
    constructor(props) {

        super(props);
        
        this.state = GAME_FIRST_STATUS;
    }

    // Returns the number of plays till end of game;
    // in order the infer if the game is tied
    //
    numberOfPlaysLeft (playerID, numberOfPlays, numberOfSquares) {
        let result;    
        const totalPlaysLeft= numberOfSquares - numberOfPlays;

        result = Math.floor((totalPlaysLeft)/2);
        result = playerID===PLAYERS.FIRST_PLAYER ? result+(totalPlaysLeft%2) : result;        
        
        // debug stuff
        console.log ('');
        console.log ('## numberOfPlaysLeft.playerID= ', playerID);
        console.log ('## numberOfPlaysLeft.numberOfPlays= ', numberOfPlays);
        console.log ('## numberOfPlaysLeft.numberOfSquares= ', numberOfSquares);
        console.log ('## numberOfPlaysLeft.result= ', result);
        
        return (result);
    }

    //
    lineOpen (board, line) {
        const FIRST_PLAYER_SYMBOL_MARK= this.state.players[PLAYERS.FIRST_PLAYER].symbolMark;
        const SECOND_PLAYER_SYMBOL_MARK= this.state.players[PLAYERS.SECOND_PLAYER].symbolMark;
        
        let result = 0;
        
        result = line.reduce ((result, square, idx) => {
            result += board[square]===FIRST_PLAYER_SYMBOL_MARK ? 10 : 0;
            result += board[square]===SECOND_PLAYER_SYMBOL_MARK ? 100 : 0;
            result += board[square]===null ? 1 : 0;

            return (result)
        }, 0);

        return (result); 
    }


    // Function : statusGame 
    //  Results:
    //  0 - first wins
    //  1-  Second wins
    //  2-  drew Game
    //  3-  On Going
    // 
    // TODO: Is it worst to verify if "number of plays" is less than "open Lines"?
    //
    statusGame (board, numberOfPlays, numberOfSquares) {
    
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let result= GAME_STATUS.DREW_GAME;
        let idx = 0;
        let score, playerID;

        let resultPerPlayer = [
            {
            numberOfOpenLines: 0,
            numberOfPlaysLeft: 0
            },
            {
            numberOfOpenLines: 0,
            numberOfPlaysLeft: 0
            }
        ];
        
        resultPerPlayer[PLAYERS.FIRST_PLAYER].numberOfPlaysLeft= 
            this.numberOfPlaysLeft(PLAYERS.FIRST_PLAYER, numberOfPlays, numberOfSquares);
        resultPerPlayer[PLAYERS.SECOND_PLAYER].numberOfPlaysLeft=
            this.numberOfPlaysLeft(PLAYERS.SECOND_PLAYER, numberOfPlays, numberOfSquares);
        
        do {
            const sqrNumberOfSquares = Math.sqrt (this.state.numberOfSquares)
            let lineScore = this.lineOpen (board, lines[idx]);
            
            // playerID= Math.floor (lineScore/tempNum)      
            playerID = (lineScore<100) ? 0 : 1
            score = (lineScore%(Math.pow(10, (playerID+1)))) ^ sqrNumberOfSquares;      
            
            // there is a winner, return it
            if (score===3) {
            // there is a winner, return it
                result = GAME_STATUS.WINNER_FOUND;
            } else if (score===0) { 
            // All empty squares; 
            // counts as open lines for both users;
                result = GAME_STATUS.ON_GOING;
                resultPerPlayer[PLAYERS.FIRST_PLAYER].numberOfOpenLines++;        
                resultPerPlayer[PLAYERS.SECOND_PLAYER].numberOfOpenLines++;        
            } else if (score<3) {
                result = GAME_STATUS.ON_GOING;
                resultPerPlayer[playerID].numberOfOpenLines++;        
            }
            
            idx++
        } while (result!==GAME_STATUS.WINNER_FOUND && idx<lines.length)

        // debug stuff
        console.log ('');
        console.log ('## StatusGame.playerID=', playerID);
        console.log ('## StatusGame.score=', score);
        console.log ('## StatusGame.result=', result);
        console.log ('## StatusGame.resultPerPlayer[PLAYERS.FIRST_PLAYER].numberOfOpenLines=', resultPerPlayer[PLAYERS.FIRST_PLAYER].numberOfOpenLines);
        console.log ('## StatusGame.resultPerPlayer[PLAYERS.SECOND_PLAYER].numberOfOpenLines=', resultPerPlayer[PLAYERS.SECOND_PLAYER].numberOfOpenLines);
        console.log ('## StatusGame.resultPerPlayer[PLAYERS.FIRST_PLAYER].numberOfPlaysLeft=', resultPerPlayer[PLAYERS.FIRST_PLAYER].numberOfPlaysLeft);
        console.log ('## StatusGame.resultPerPlayer[PLAYERS.SECOND_PLAYER].numberOfPlaysLeft=', resultPerPlayer[PLAYERS.SECOND_PLAYER].numberOfPlaysLeft);
        
        return result;
    }


    //
    handlerClickResetGame () {
      let state;

      state = GAME_FIRST_STATUS

      this.setState (state);
    }
    
    // Player has made a move; Let's manage it
    //
    // Todo : Is Array.slice the most effective way to create a new array, for immutable state...
    // Todo : And, if 'playerID' was put in place of 'playerSymbolMark' on 'currentBoard[i]';
    //
    handleClick (i) {
        const currentBoardHistory = this.state.historyGame.length-1;
        const historyGame = this.state.historyGame;
        const currentBoard = historyGame[currentBoardHistory].board.slice();
        const playerID = this.state.currentPlayer;
        
        const playerSymbolMark = this.state.players[playerID].symbolMark;
        let numberOfPlays = this.state.numberOfPlays;
        const numberOfSquares = this.state.numberOfSquares;      
        
        let statusGame = this.state.statusGame;
        
        let state = {};
        
        if (!currentBoard[i] && 
            statusGame===GAME_STATUS.ON_GOING &&
            this.state.currentBoardHistory === currentBoardHistory ) {  
            
            currentBoard[i] = playerSymbolMark;
            historyGame.push (
            {
                board : currentBoard,
                timeStamp : new Date()
            }
            );
                
            state.currentPlayer = playerID ^ 1;       //Alternate/Change player;
            state.numberOfPlays = numberOfPlays+1;
            state.historyGame = historyGame;
            state.currentBoardHistory = historyGame.length-1
            state.statusGame = this.statusGame (currentBoard, numberOfPlays, numberOfSquares);;

            // debug stuff
            console.log ('## handlerClick.status=', statusGame);
            console.log ('## handlerClick.numberOfPlays=', numberOfPlays);            
        }

        this.setState (state);
    }


    // Allows user to change to any point of game's history
    //
    handleClickHistoryView(i) {
        let state= this.state;
        state.currentBoardHistory= i;
        this.setState (state);
    }


    // Render Stuff 
    //
    render() {        
        const historyGame = this.state.historyGame.slice()
        const currentBoardHistory = this.state.currentBoardHistory;
        const currentBoard = historyGame[currentBoardHistory].board;
        const currentPlayerID = this.state.currentPlayer;
        const currentPlayerObj = this.state.players[currentPlayerID];
        const statusGame = this.state.statusGame;      
        
        return (
            <div className = "game">
            <div className = "game-board">
                <BoardTemplate 
                onClick={ i => this.handleClick(i) }
                player = {currentPlayerID}
                boardGame = {currentBoard}        
                />
            </div>
            <div className="game-info">          
                <NextMoveStatus  statusGame={statusGame} player={currentPlayerObj} />
                <ReStartResetButton onClick={() => this.handlerClickResetGame()} />          
                <HistoryView historyGame={historyGame} onClick={(i) => this.handleClickHistoryView(i)} />          
            </div>
            </div>
        );
    }
}

export default Game;