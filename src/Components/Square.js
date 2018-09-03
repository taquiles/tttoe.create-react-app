// React 
import React from 'react';

// ####################################################################
// Square Component
// 
var Square = (props) => ( 
  <div className= "square" onClick = {props.onClick}>
    {props.value}
  </div>
);
  
export default Square;