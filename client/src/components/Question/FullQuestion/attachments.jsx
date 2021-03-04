import React from 'react';
import styled from 'styled-components';


import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { responsive } from '../../utils/data.json';


// Styled Components ==============================================

const AttachmentsDiv = styled.div`
  width: 100% !important;
  max-width: calc(100vw - 4em);
  display: block;
  box-sizing: border-box;
  overflow-x: auto;
`;

const AttachmentsGrid = styled.div`
  display: flex;
  height: 300px;

  .attachments{
    width: auto;
    height: 100%; 
    border-radius: 4px;
    margin: 0 4px 0 4px;
  }
`;


// =================================================================


const useStyles = makeStyles((theme) => ({
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
      <AttachmentsDiv>
          <AttachmentsGrid>
            {props.attachments.map((tile) => (
                <img src={tile.url} className="attachments" />
            ))}
          </AttachmentsGrid>
      </AttachmentsDiv>
    );
}



{/* <GridList cellHeight={300} className={classes.gridList} style={{width:"100%"}}>
          {props.attachments.map((tile) => (
            <GridListTile style={{width: 'auto'}}>
              <img src={tile.url} style={{width:'auto', height: '100%', borderRadius:'4px'}} />
            </GridListTile>
          ))}
        </GridList> */}