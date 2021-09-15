import React from "react";
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

export default function NotFound() {
  return (
    <div>
      <h1 style={{color:'black'}}>RESOURCE NOT FOUND AT THIS LOCATION || 404</h1>
      <Button 
      component={Link}
       to="/home">Home</Button>
    </div>
  );
}
