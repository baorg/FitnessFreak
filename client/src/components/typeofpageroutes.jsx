import React, { useState, useEffect } from "react";
import App from "./Main/App";
import axios from "axios";
import { useRoutes } from 'hookrouter';
import {HTML404 } from './ErrorPage/Error';
import TypeOfPage from "./Main/typeofpage";



function getRoutes(props) {
  return {
    '/': () => <TypeOfPage typeofpage={props.typeofpage} user={props.user} />,
    '/:categoryname': ({categoryname}) => <TypeOfPage typeofpage={props.typeofpage} categoryname={categoryname} user={props.user} />
  }
}

function TypeOfPageRoutes(props) {

  const page = useRoutes(getRoutes(props)) 
  return (
    page || <HTML404 />
  );
}

export default TypeOfPageRoutes;
