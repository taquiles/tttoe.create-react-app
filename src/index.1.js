import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  
  let position= this.props.position;
  render() {
    
    return (
      <button className="square" 
              onClick={
                () =>{
                  this.props.boardGame[this.props.position]= this.player 
                  }
              }
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square position={i} boardGame={this.props.boardGame} player={this.props.player} />;    
  }

  render() {
    
    return (
      <div>
        <div className="status">{"Player: "+this.props.player}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor () {
    super();
    this.boardGame = [null, null, null, null, null, null, null, null, null];
    this.player    = 'X';
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board boardGame={this.boardGame} player={this.player}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
