import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import IconButton from '@material-ui/core/IconButton';
// import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)'
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));


export default function Attachments(props) {
    const classes = useStyles();
    
    return (
      <div className={classes.root} >
        <GridList cellHeight={300} className={classes.gridList} style={{width:"100%"}}>
          {props.attachments.map((tile) => (
            <GridListTile style={{width: 'auto'}}>
              <img src={tile.url} style={{width:'auto', height: '100%', marginLeft: '0.4em', borderRadius:'4px'}} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
}