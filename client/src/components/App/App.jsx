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
  grid-template-columns: 1fr 600px 1fr;
  background-color: #eeeeee;
  min-height: 100vh;
  height: fit-content;
`;

// ==================================================================================================

const App = function (props) {
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);
  
  const [path, setPath] = usePath();

  console.log('Path: ', path);

  return (
      <ContentContainer>
        <LeftNavBar user={props.user} setCategory={setCategory} category={category} />
        <Content setType={setType} type={type} category={category} />
        <RightNavBar />
      </ContentContainer>
    );
};

export default App;