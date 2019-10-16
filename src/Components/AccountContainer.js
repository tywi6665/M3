import React from 'react';
import AccountChart from "../Visualizations/AccountChart";

const AccountContainer = ({ account, balance }) => {
    return (
        <div className="account-container">
            <div>
                <p className="account-name">{account}</p>
                <p className="account-balance"><span>$</span>{balance}</p>
            </div>
            <AccountChart />
        </div>
    );
}

export default AccountContainer;