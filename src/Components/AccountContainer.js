import React from 'react';
import AccountChart from "../Visualizations/AccountChart";

const AccountContainer = ({ account, balance, accountHistory }) => {
    return (
        <div className="account-container">
            <div>
                <p className="account-name">{account}</p>
                <p className="account-balance"><span>$</span>{balance}</p>
            </div>
            <AccountChart
                accountHistory={accountHistory}
            />
        </div>
    );
}

export default AccountContainer;