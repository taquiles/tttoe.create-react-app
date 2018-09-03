// React 
import React from 'react';

// Material.ui 
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


// Date and time manipulation
import moment from 'moment';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 1,
    paddingBottom: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit *1,
    width: 300,
    fontSize: 100,
  },
});

const HistoryView = (props) => {
  const {classes}= props;
  return props.historyGame.map ((historyItem, idx) => {
    return (
      <Paper className={classes.root} elevation={10} key={idx}>
        <div onClick={()=>props.onClick (idx) }>
          <Typography>
            {idx===0 ? (
              <span>
                Begin - {moment(historyItem.timeStamp).format('MMMM Do YYYY, h:mm:ss a')} `
              </span>
            ) : (
              <span>
                Move - {idx} - {historyItem.board} - {moment(historyItem.timeStamp).format('MMMM Do YYYY, h:mm:ss a')}       
              </span>
            )}
          </Typography>
        </div>
      </Paper>
    )
  })
}

HistoryView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryView);