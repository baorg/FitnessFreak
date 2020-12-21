import React, {useState} from "react"
import MyNav from "../Navigation/navbar/navbar"
import Content from "./Main";
import LeftNavBar from "./LeftNav";
import RightNavBar from "./RightNav";
import styled from 'styled-components';




const ContentContainer = styled.div`
  position: relative;
  top: 50px;
  display: grid;
  grid-template-columns: 1fr 600px 1fr;
  background-color: #eeeeee;
  min-height: 100vh;
  height: fit-content;
`;


const App = function (props) {
  const [category, setCategory] = useState(null);
  const [type, setType] = useState(null);


    return (
      <>
        <MyNav user={props.user} />
        <ContentContainer>
          <LeftNavBar user={props.user} setCategory={setCategory} category={category} />
          <Content setType={setType} type={type} category={category} />
          <RightNavBar />
        </ContentContainer>
      </>);
};

export default App;