import React, { useState, useEffect } from 'react';
import { SpendingDataProvider } from "./useContext/SpendingDataContext";
import MasterContainer from "./Components/MasterContainer";
import Container from "./Components/Container";
import './App.scss';
import Navbar from './Components/Navbar';
import SpendingChart from './Visualizations/SpendingChart';
import * as d3 from "d3";
import AccountContainer from './Components/AccountContainer';

function App() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentDate, setCurrentDate] = useState("--");
  const [accountData, setAccountData] = useState([{ account: "Checking", balance: "3,203", accountHistory: [{ amount: 3279.36, date: "6/24/2019" }, { amount: 2797.23, date: "7/23/2019" }, { amount: 2412.44, date: "8/22/2019" }, { amount: 3385.76, date: "9/24/2019" }] }, { account: "Savings", balance: "1,000", accountHistory: [{ amount: 25, date: "6/29/2019" }, { amount: 100, date: "6/30/2019" }, { amount: 75, date: "7/1/2019" }] }, { account: "Credit Cards", balance: "1,500", accountHistory: [{ amount: 50, date: "6/29/2019" }, { amount: 25, date: "6/30/2019" }, { amount: 100, date: "7/1/2019" }] }])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let formatTime = d3.timeFormat("%A %B %d, %Y");
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
            <div className="text-div">
              <p className="name-text">Hello, <span>{`Tyler`}</span></p>
              <p className="date-text">Today is <span>{currentDate}</span></p>
            </div>
            {accountData.map((data, i) => {
              return (
                <AccountContainer
                  account={data.account}
                  balance={data.balance}
                  accountHistory={data.accountHistory}
                  key={i}
                />
              )
            })}
          </Container>
          <Container
            number="2"
            header={["Overall Spending", "Display"]}
            subHeader="Your Spending Chart"
          >
            <SpendingChart />
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
