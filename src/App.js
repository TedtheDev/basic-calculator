import React, { Component } from 'react';
import styled from 'styled-components';

import Calculator from './components/Calculator/calculator';


const AppDiv = styled.div`
  display: grid;
  grid-template: 10% 80% 10% / 10% 80% 10%;
  grid-template-areas:
    "header header header"
    ". content ."
    "footer footer footer";
  width: 100%;
  height: 100%;
`;

const MainContent = styled.main`
  grid-area: content;
  display: flex;
  justify-content: center;
`;

class App extends Component {
  render() {
    return (
      <AppDiv>
        <MainContent>
          <Calculator />
        </MainContent>
      </AppDiv>
    );
  }
}

export default App;
