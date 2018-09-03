// React 
import React from 'react';

// Material.ui 
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';// 
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';

// Date and time manipulation
// import moment from 'moment';

// Application Sub-Components
import Square from './Square';

// Styling
import '.././Styling/index.css';

// Players
// const PLAYERS = {
// FIRST_PLAYER : 0,
// SECOND_PLAYER : 1
//}

// Game Status Constants
//
//const GAME_STATUS = {    
//    DREW_GAME : 2,
//    ON_GOING : 3,
//    WINNER_FOUND : 4,
//}


// ####################################################################
// Board Component
// 

class BoardTemplate extends React.Component {

  boardTemplate () {
    let boardGame = this.props.boardGame;
    // let rowsCols= this.props.rowsCols;
    return (boardGame.map((element, idx)=> (
        <Square           
          key={idx}                
          value={this.props.boardGame[idx]}
          onClick={() => this.props.onClick(idx)}
        />
    )))
  }

  render() {    
    return ( 
      <div className="board-template">                
          {this.boardTemplate ()}          
      </div>      
    );
  }
}


export default BoardTemplate;