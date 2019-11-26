import React, { useState, useEffect } from 'react';
import { SpendingDataProvider } from "./useContext/SpendingDataContext";
import MasterContainer from "./Components/MasterContainer";
import Container from "./Components/Container";
import './App.scss';
import Navbar from './Components/Navbar';
import SpendingChart from './Visualizations/SpendingChart';
import * as d3 from "d3";
import AccountContainer from './Components/AccountContainer';
import List from "./Components/List";


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
    setCurrentDate(formatTime(new Date()));
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
            header={["Category", "Split"]}
            subHeader="Your Spending Split by Category"
          >
            <p>Bubble Chart</p>
          </Container>
          <Container
            number="4"
            header={["Recent Transactions", "Section"]}
            subHeader="Your Transaction History"
          >
            <List
              section="recent"
              key={"recent"}
            />
          </Container>
          <Container
            number="5"
            header={["Overall Spending by Category", "Display"]}
            subHeader="Your Transaction History Broken Down by Category"
          >
            <List
              section="category"
              key={"category"}
            />
          </Container>
        </MasterContainer>
      </div>
    </SpendingDataProvider>
  );
}

export default App;
