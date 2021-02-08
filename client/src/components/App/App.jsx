import React, {useState} from "react"
import styled from 'styled-components';
import { usePath, useQueryParams } from 'hookrouter';

import Content from "./Main";
import LeftNavBar from "./LeftNav";
import RightNavBar from "./RightNav";

// Styled Components ===============================================================================

const ContentContainer = styled.div`
  position: relative;
  top: 50px;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 700px 1fr;
  background-color: #eeeeee;
  min-height: 100vh;
  height: fit-content;
`;

// ==================================================================================================

const App = function ({user, }) {
  const [ selectedCategories, setSelectedCategories ] = useState(null);
  const [ type, setType ] = useState(null);
  const [ path, setPath ] = usePath();

  // console.log('Path: ', path);

  return (
      <ContentContainer>
        <LeftNavBar user={user} setSelectedCategories={setSelectedCategories} selectedCategories={selectedCategories} />
        <Content setType={setType} type={type}
          selectedCategories={selectedCategories}
          user={user} />
        <RightNavBar />
      </ContentContainer>
    );
};

export default App;