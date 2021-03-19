import React, {useState, useEffect} from "react"
import styled from 'styled-components';
import { usePath, useQueryParams } from 'hookrouter';

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Content from "./Main";
import LeftNavBar from "./LeftNav";
import RightNavBar from "./RightNav";
import { responsive } from '../utils/data.json';
// Styled Components ===============================================================================

const ContentContainer = styled.div`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  grid-template-columns: ${({midPoint, lastPoint})=>lastPoint? "0 1fr 0": midPoint? "250px 1fr": "1fr 800px 1fr"};
  min-height: 100vh;
  height: fit-content;
`;

// ==================================================================================================

const App = function ({user, }) {
  const [ selectedCategories, setSelectedCategories ] = useState(null);
  const [ type, setType ] = useState(null);
  const [ path, setPath ] = usePath();

  let midPoint = useMediaQuery(`(min-width: ${responsive.small}) and (max-width: ${responsive.medium})`);
  let lastPoint = useMediaQuery(`(max-width: ${responsive.small})`);

  // useEffect(()=>{
  //   console.log(`col:  ${lastPoint? "0 100% 0": midPoint? "1fr 2fr": "1fr 800px 1fr"}`);
  // }, [midPoint, lastPoint])

  // console.log('Path: ', path);

  return (
      <ContentContainer midPoint={midPoint} lastPoint={lastPoint}>
        <LeftNavBar 
          user={user} 
          setSelectedCategories={setSelectedCategories} 
          selectedCategories={selectedCategories} />
        <Content setType={setType} type={type}
          selectedCategories={selectedCategories}
          user={user} />
        <RightNavBar />
      </ContentContainer>
    );
};

export default App;