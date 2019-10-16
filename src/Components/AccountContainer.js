import React from 'react';

const AccountContainer = ({ account, balance, children }) => {
    return (
        <div className="account-container">
            <div>
                <p className="account-name">{account}</p>
                <p className="account-balance"><span>$</span>{balance}</p>
            </div>
            {children}
        </div>
    );
}

export default AccountContainer;