import React, {useState, useEffect} from "react"
import styled from 'styled-components';
import { usePath, useQueryParams } from 'hookrouter';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Content from "./Main";
import LeftNavBar from "./LeftNav";
import RightNavBar from "./RightNav";

// Styled Components ===============================================================================

const ContentContainer = styled.div`
  position: relative;
  top: ${({lastPoint})=>lastPoint? "8em": "5em"};
  display: grid;
  margin-left: auto;
  margin-right: auto;

  width: ${({midPoint})=>midPoint? "85%": "100%"};
  grid-template-columns: ${({midPoint, lastPoint})=>lastPoint? "0 1fr 0": midPoint? "auto 1fr": "1fr 700px 1fr"};
  background-color: #eeeeee;
  min-height: 100vh;
  height: fit-content;
`;

// ==================================================================================================

const App = function ({user, }) {
  const [ selectedCategories, setSelectedCategories ] = useState(null);
  const [ type, setType ] = useState(null);
  const [ path, setPath ] = usePath();

  let midPoint = useMediaQuery('(min-width: 800px) and (max-width: 1200px)');
  let lastPoint = useMediaQuery('(max-width: 800px)');

  useEffect(()=>{
    console.log(`col:  ${lastPoint? "0 100% 0": midPoint? "auto 100%": "1fr 700px 1fr"}`);
  }, [midPoint, lastPoint])

  // console.log('Path: ', path);

  return (
      <ContentContainer midPoint={midPoint} lastPoint={lastPoint}>
        <LeftNavBar user={user} setSelectedCategories={setSelectedCategories} selectedCategories={selectedCategories} />
        <Content setType={setType} type={type}
          selectedCategories={selectedCategories}
          user={user} />
        <RightNavBar />
      </ContentContainer>
    );
};

export default App;