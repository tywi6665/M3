import React, { useState, useEffect } from 'react';
import { SpendingDataProvider } from "./useContext/SpendingDataContext";
import MasterContainer from "./Components/MasterContainer";
import Container from "./Components/Container";
import './App.scss';
import Navbar from './Components/Navbar';
import LineChart from './Visualizations/LineChart';
import * as d3 from "d3";

function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentDate, setCurrentDate] = useState("--");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let formatTime = d3.timeFormat("%B %d, %Y");
    setCurrentDate(formatTime(new Date));
  }, [])



  return (
    <SpendingDataProvider>
      <div className="app">
        <MasterContainer>
          <Navbar />
          <Container
            number="1"
            header={["Your Account", "Overview"]}
            subHeader="Your Current Balances"
          >
            <p>Hello <span>{`Tyler`}</span></p>
            <p>Today is <span>{currentDate}</span></p>
          </Container>
          <Container
            number="2"
            header={["Overall Spending", "Display"]}
            subHeader="Your Spending Chart"
          >
            <LineChart />
          </Container>
          <Container
            number="3"
            header={["The Other", "Section"]}
            subHeader="The Other Section"
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Container>
          <Container
            number="4"
            header={["The OtherOther", "Section"]}
            subHeader="The OtherOther Section"
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Container>
          <Container
            number="5"
            header={["The OtherOtherOther", "Section"]}
            subHeader="The OtherOtherOther Section"
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Container>
        </MasterContainer>
      </div>
    </SpendingDataProvider>
  );
}

export default App;
